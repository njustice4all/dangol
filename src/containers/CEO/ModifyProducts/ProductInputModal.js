import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import { connect } from 'react-redux';
import cx from 'classnames';

import { initUploadImage, initGetProductDetail } from '../../../actions/ceo';

import { ATY_URI, SITE_ID } from '../../../constants';

class ButtonAddImage extends Component {
  _onChange = e => {
    const { _uploadImage, idx } = this.props;
    // FIXME: userId etc... 필요
    // 이미지 업로드시 어떤 상품의 사진인가? 알아야 getProducts했을때 사진이 적용된다
    const formData = new FormData(this.image);
    formData.append('siteId', SITE_ID);
    formData.append('userId', 'hyj679');
    formData.append('folder', 'all');
    formData.append('keyWord', 'ImageUpload');

    // _uploadImage({ formData, idx });
    this.props._onChangePreview(e, formData);
  };

  render() {
    return (
      <div className="images products">
        <form ref={image => (this.image = image)} style={{ width: '100%', height: '100%' }}>
          <label>
            <h1>+</h1>
            <input
              style={{ display: 'none' }}
              multiple
              accept="image/*"
              name="img-upload[]"
              type="file"
              onChange={this._onChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

const ProductImage = ({ image, preview, index, deleteImageByIndex }) => {
  if (preview) {
    return (
      <div className="images products" style={{ verticalAlign: 'top' }}>
        <span className="btn-delete" onClick={deleteImageByIndex(index, true)}>
          <img src="/img/icon06.png" alt="" />
        </span>
        <img className="img-cover" src={image.get('base64')} alt="" />
      </div>
    );
  }

  return (
    <div className="images products" style={{ verticalAlign: 'top' }}>
      <span className="btn-delete" onClick={deleteImageByIndex(index)}>
        <img src="/img/icon06.png" alt="" />
      </span>
      <img
        className="img-cover"
        src={`${ATY_URI}/aty_image_view.php?siteId=${SITE_ID}&iID=${image.get('seq')}&thumb=1`}
        alt=""
      />
    </div>
  );
};

class OptionWrapper extends Component {
  render() {
    const {
      options,
      _onChangeOptionByKey,
      _onDeleteOption,
      _onAddOption,
      _onAddProperty,
      _onDeleteProperty,
    } = this.props;

    return (
      <div className="row-wrapper options" style={{ position: 'relative' }}>
        <div className="option-wrapper">
          {options.map((option, index) => (
            <div className="options" key={`options-${index}`}>
              <div className="option-title-wrapper">
                <div
                  className="option-name"
                  style={{ display: 'inline-block', color: '#fe931f', width: '65px' }}>
                  옵션명
                </div>
                <input
                  type="text"
                  value={option.get('option_name')}
                  onChange={e => console.log(e)}
                />
                <div className="button-delete" onClick={_onDeleteOption(index)}>
                  <img src="/img/icon-close.png" alt="" />
                </div>
              </div>
              {option.get('list').map((list, i) => {
                return (
                  <div className="options-property" key={`property-${i}`}>
                    <div className="option-name">
                      <span>{`옵션속성 ${i + 1}`}</span>
                    </div>
                    <div className="option-input-name">
                      <input
                        type="text"
                        value={list.get('option_data')}
                        onChange={_onChangeOptionByKey(index, i, 'option_data')}
                      />
                    </div>
                    <div className="option-price">
                      <span>가격</span>
                    </div>
                    <div className="option-input-price">
                      <input
                        type="number"
                        value={list.get('price')}
                        onChange={_onChangeOptionByKey(index, i, 'price')}
                        onClick={e => e.target.select()}
                      />
                      <span>원</span>
                    </div>
                    <div
                      className={cx('option-input-control', {
                        first: option.get('list').size === 1 ? true : false,
                        plus: option.get('list').size - 1 === i ? true : false,
                      })}>
                      <span id="minus" onClick={_onDeleteProperty(index, i)}>
                        <img src="/img/minus.png" />
                      </span>
                      <span id="plus" onClick={_onAddProperty(index)}>
                        <img src="/img/plus.png" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="btn-add-option">
          <span onClick={_onAddOption}>+ 옵션 추가</span>
        </div>
      </div>
    );
  }
}

class ProductInputModal extends Component {
  state = { preview: List(), productDetail: '' };

  componentDidMount = () => {
    const { initGetProductDetail, idx, isNew } = this.props;
    if (!isNew) {
      initGetProductDetail(idx);
    } else {
      // FIXME: 새상품 추가일때... api의 prototype대로 state설정 후 해결...
      console.log('hi...');
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState(prevState => ({ productDetail: nextProps.productDetail }));
  };

  _onChangeByKeys = (key1, key2) => e => {
    e.persist();
    if (this.props.isNew) {
      console.log('hi');
      return;
    }
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

    // FIXME:
    const option = fromJS({
      list: [{ option_data: '', price: '' }],
      option_name: '',
      option_type: '',
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

  _uploadImage = payload => {
    this.props.initUploadImage(payload);
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

  // FIXME:
  onConfirm = isNew => () => {
    if (isNew) {
      console.log('new product');
      return;
    }

    console.log(this.state.productDetail.toJS(), this.state.preview.toJS());
    // if (this.state.preview.size > 0) {
    //   this._uploadImage({
    //     formData: this.state.preview.getIn([0, 'formData']),
    //     idx: this.props.idx,
    //   });
    // }
  };

  render() {
    const { preview, productDetail } = this.state;
    const { togglePopup, isNew, idx } = this.props;

    const info = productDetail && productDetail.get('info');
    const sellInfo = productDetail && productDetail.get('sellinfo');
    let images = productDetail && productDetail.getIn(['info', 'mainImage']);
    let options = productDetail && productDetail.getIn(['stock', 'option_control', 'main']);
    // productDetail && productDetail.getIn(['stock', 'option_control', 'main', 0, 'list']);

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
              <ButtonAddImage
                _uploadImage={this._uploadImage}
                idx={idx}
                _onChangePreview={this._onChangePreview}
              />
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
  }),
  dispatch => ({
    initUploadImage: payload => dispatch(initUploadImage(payload)),
    initGetProductDetail: idx => dispatch(initGetProductDetail(idx)),
  })
)(ProductInputModal);
