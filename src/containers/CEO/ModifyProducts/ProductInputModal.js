import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import { connect } from 'react-redux';

import OptionWrapper from './OptionWrapper';
import ProductImage from './ProductImage';
import ButtonAddImage from './ButtonAddImage';
import {
  initUploadImage,
  initGetProductDetail,
  initSetProducts,
  initGetProducts,
} from '../../../actions/ceo';

import Converter from '../../../utils/Converter';

import { ATY_URI, SITE_ID } from '../../../constants';

class ProductInputModal extends Component {
  state = { preview: List(), productDetail: '' };

  componentDidMount = () => {
    const { initGetProductDetail, idx, isNew } = this.props;
    if (!isNew) {
      initGetProductDetail(idx);
    } else {
      this.setState(prevState => ({
        productDetail: fromJS({
          sellinfo: {
            price: '',
          },
          info: {
            mainImage: [],
            name: '',
            contents: '',
          },
          stock: {
            option_control: {
              main: [],
            },
          },
        }),
      }));
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initGetProducts, initGetProductDetail, idx, isNew, togglePopup } = this.props;

    if (nextProps.setProducts !== this.props.setProducts) {
      togglePopup()();
      initGetProducts();
      return;
    }

    this.setState(prevState => ({ productDetail: nextProps.productDetail }));
  };

  componentWillUnmount = () => {
    this.props.closeModal();
  };

  _onChangeByKeys = (key1, key2) => e => {
    e.persist();
    this.setState(prevState => ({
      productDetail: prevState.productDetail.setIn([key1, key2], e.target.value),
    }));
  };

  _onChangeOptionByKey = (index, i, key) => e => {
    e.persist();

    this.setState(prevState => ({
      productDetail: prevState.productDetail.setIn(
        ['stock', 'option_control', 'main', index, 'list', i, key],
        e.target.value
      ),
    }));
  };

  _onChangeOptionName = index => e => {
    e.persist();

    this.setState(prevState => ({
      productDetail: prevState.productDetail.setIn(
        ['stock', 'option_control', 'main', index, 'option_name'],
        e.target.value
      ),
    }));
  };

  _onDeleteOption = index => () => {
    this.setState(prevState => ({
      productDetail: prevState.productDetail.deleteIn(['stock', 'option_control', 'main', index]),
    }));
  };

  _onDeleteProperty = (index, i) => () => {
    this.setState(prevState => ({
      productDetail: prevState.productDetail.deleteIn([
        'stock',
        'option_control',
        'main',
        index,
        'list',
        i,
      ]),
    }));
  };

  _onAddProperty = index => () => {
    const { productDetail } = this.state;
    if (productDetail.getIn(['stock', 'option_control', 'main', index, 'list']).size > 4) {
      return;
    }

    const option = Map({ option_data: '', price: '' });

    this.setState(prevState => ({
      productDetail: prevState.productDetail.updateIn(
        ['stock', 'option_control', 'main', index, 'list'],
        list => list.push(option)
      ),
    }));
  };

  _onAddOption = () => {
    if (this.state.productDetail.getIn(['stock', 'option_control', 'main']).size > 4) {
      return;
    }

    const option = fromJS({
      list: [{ option_data: '', price: '' }],
      option_name: '',
      option_type: '1',
    });

    this.setState(prevState => ({
      productDetail: prevState.productDetail.updateIn(['stock', 'option_control', 'main'], list =>
        list.push(option)
      ),
    }));
  };

  _onChangePreview = (e, formData) => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState(prevState => ({
          preview: prevState.preview.push(Map({ base64: reader.result, formData })),
        }));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  deleteImageByIndex = (index, preview) => () => {
    if (preview) {
      this.setState(prevState => ({ preview: prevState.preview.delete(index) }));
      return;
    }

    this.setState(prevState => ({
      productDetail: prevState.productDetail.deleteIn(['info', 'mainImage', index]),
    }));
  };

  onConfirm = isNew => () => {
    const { productDetail, preview } = this.state;
    const { initGetProducts, initUploadImage, initSetProducts, idx } = this.props;

    if (isNew) {
      initUploadImage({ formData: this.state.preview.getIn([0, 'formData']), idx, productDetail });
      return;
    }

    if (preview.size > 0) {
      initUploadImage({ formData: this.state.preview.getIn([0, 'formData']), idx, productDetail });
    } else {
      const result = Converter.toSetProductData(productDetail, null, idx);
      initSetProducts(result);
    }
  };

  render() {
    const { preview, productDetail } = this.state;
    const { togglePopup, isNew, idx } = this.props;

    const info = productDetail && productDetail.get('info');
    const sellInfo = productDetail && productDetail.get('sellinfo');
    let images = productDetail && productDetail.getIn(['info', 'mainImage']);
    let options = productDetail && productDetail.getIn(['stock', 'option_control', 'main']);

    if (!options) {
      options = List();
    }

    if (!images) {
      images = List();
    }

    return (
      <div className="items products popup">
        <div className="product__wrapper popup">
          <header className="product-header center">
            <h3>상품 수정</h3>
          </header>
          <div className="wrapper-padding">
            <div className="image__wrapper" style={{ maxWidth: `${window.innerWidth - 32}px` }}>
              <ButtonAddImage idx={idx} _onChangePreview={this._onChangePreview} />
              {images
                ? images.map((image, i) => (
                    <ProductImage
                      key={`images-${i}`}
                      image={image}
                      index={i}
                      deleteImageByIndex={this.deleteImageByIndex}
                    />
                  ))
                : null}
              {preview.size > 0
                ? preview.map((previewImage, i) => (
                    <ProductImage
                      key={`previewImage-${i}`}
                      image={previewImage}
                      preview
                      index={i}
                      deleteImageByIndex={this.deleteImageByIndex}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className="product__form__wrapper">
            <div className="wrapper-padding">
              <div className="row-wrapper">
                <span className="row-title">상품명</span>
                <input
                  type="text"
                  value={info && info.get('name')}
                  onChange={this._onChangeByKeys('info', 'name')}
                  placeholder="상품명을 입력하세요."
                  ref={name => (this.name = name)}
                />
              </div>
              <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
                <span className="row-title">가격</span>
                <input
                  type="number"
                  value={sellInfo && sellInfo.get('price')}
                  onChange={this._onChangeByKeys('sellinfo', 'price')}
                  ref={price => (this.price = price)}
                  onClick={e => e.target.select()}
                />
                <span id="currency">원</span>
              </div>
              <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
                <span className="row-title">설명</span>
                <input
                  type="text"
                  value={info && info.get('contents')}
                  onChange={this._onChangeByKeys('info', 'contents')}
                  ref={contents => (this.contents = contents)}
                />
              </div>
            </div>
            <OptionWrapper
              options={options}
              onConfirm={this.onConfirm}
              _onChangeOptionByKey={this._onChangeOptionByKey}
              _onDeleteOption={this._onDeleteOption}
              _onAddOption={this._onAddOption}
              _onAddProperty={this._onAddProperty}
              _onDeleteProperty={this._onDeleteProperty}
              _onChangeOptionName={this._onChangeOptionName}
            />
            <div className="button-normal">
              <span className="button button-left" onClick={togglePopup(null, 'close', isNew)}>
                취 소
              </span>
              <span className="button button-right" onClick={this.onConfirm(isNew)}>
                확 인
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    productDetail: state.getIn(['ceo', 'productDetail']),
    uploadImageSeq: state.getIn(['ceo', 'uploadImageSeq']),
    setProducts: state.getIn(['ceo', 'setProducts']),
  }),
  dispatch => ({
    initUploadImage: payload => dispatch(initUploadImage(payload)),
    initGetProductDetail: idx => dispatch(initGetProductDetail(idx)),
    initSetProducts: payload => dispatch(initSetProducts(payload)),
    initGetProducts: payload => dispatch(initGetProducts(payload)),
    closeModal: () => dispatch({ type: 'ceo/CLOSE_MODAL' }),
  })
)(ProductInputModal);
