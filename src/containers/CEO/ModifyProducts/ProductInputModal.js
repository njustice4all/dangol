import React, { Component } from 'react';
import { fromJS, List, Map } from 'immutable';
import { connect } from 'react-redux';

import { initUploadImage } from '../../../actions/ceo';

import { ATY_URI, SITE_ID } from '../../../constants';

class ButtonAddImage extends Component {
  _uploadImage = e => {
    // console.log(e.target.files[0]);
    // console.log(this.image);

    const formData = new FormData(this.image);
    formData.append('siteId', SITE_ID);
    // formData.append('userId', userId);
    formData.append('folder', 'all');
    formData.append('keyWord', 'ImageUpload');

    this.props._uploadImage(formData);
  };

  render() {
    return (
      <div className="images products">
        <label>
          <h1>+</h1>
          <input
            style={{ display: 'none' }}
            multiple
            accept="image/*"
            name="img-upload[]"
            type="file"
            ref={image => (this.image = image)}
            onChange={this._uploadImage}
          />
        </label>
      </div>
    );
  }
}

const ProductImage = ({ image, preview }) => {
  return (
    <div className="images products" style={{ verticalAlign: 'top' }}>
      <span className="btn-delete">
        <img src="/img/icon06.png" alt="" />
      </span>
      <img
        className="img-cover"
        src={`${ATY_URI}/aty_image.php?siteId=${SITE_ID}&iID=${image.get('idx')}&thumb=2`}
        alt=""
      />
    </div>
  );
};

class OptionWrapper extends Component {
  render() {
    const {
      options,
      _onChangeOptionName,
      _onChangeOptionPrice,
      _onDeleteOption,
      _onAddOption,
    } = this.props;

    return (
      <div className="row-wrapper options" style={{ position: 'relative' }}>
        <div className="option-wrapper">
          {options.map((option, index) => (
            <div className="options" key={`options-${index}`}>
              <div className="option-name">
                <span>{`옵션 ${index + 1}`}</span>
              </div>
              <div className="option-input-name">
                <input
                  type="text"
                  defaultValue={option.get('option_data')}
                  onChange={_onChangeOptionName(index)}
                />
              </div>
              <div className="option-price">
                <span>가격</span>
              </div>
              <div className="option-input-price">
                <input
                  type="number"
                  defaultValue={option.get('price')}
                  onChange={_onChangeOptionPrice(index)}
                  onClick={e => e.target.select()}
                />
                <span>원</span>
              </div>
              <div className="button-delete" onClick={_onDeleteOption(index)}>
                <img src="/img/icon-close.png" alt="" />
              </div>
            </div>
          ))}
          <div className="btn-add-option" onClick={_onAddOption}>
            <span>+ 옵션 추가</span>
          </div>
        </div>
      </div>
    );
  }
}

class ProductInputModal extends Component {
  constructor(props) {
    super(props);

    const { product } = props;

    let options = product.getIn(['option_list', 0]);
    if (options) {
      const jsonOption = options.toJS();
      if (!Array.isArray(jsonOption)) {
        options = fromJS(
          Object.keys(jsonOption).map(v => {
            return jsonOption[v];
          })
        );
      }
    } else {
      options = List();
    }

    this.state = { options, preview: '' };
  }

  _onChangeOptionName = index => e => {
    e.persist();
    this.setState(prevState => ({
      options: prevState.options.map((option, i) => {
        if (i === index) {
          return option.set('option_data', e.target.value);
        }

        return option;
      }),
    }));
  };

  _onChangeOptionPrice = index => e => {
    e.persist();
    this.setState(prevState => ({
      options: prevState.options.map((option, i) => {
        if (i === index) {
          return option.set('price', e.target.value);
        }

        return option;
      }),
    }));
  };

  _onDeleteOption = index => () => {
    this.setState(prevState => ({
      options: prevState.options.filter((option, i) => i !== index),
    }));
  };

  _onAddOption = () => {
    this.setState(prevState => ({
      options: prevState.options.push(
        Map({
          option_name: '사이드디시',
          option_data: '',
          price: '',
          stock: 'default',
        })
      ),
    }));
  };

  _uploadImage = payload => {
    this.props.initUploadImage(payload);
  };

  onConfirm = () => {
    console.log(this.state.options.toJS(), this.name, this.price, this.contents);
  };

  render() {
    const { options, preview } = this.state;
    const { product, togglePopup, onImageChange } = this.props;

    return (
      <div className="items products popup">
        <div className="product__wrapper popup">
          <header className="product-header center">
            <h3>{product.get('uniqueId') ? '상품 추가' : '상품 수정'}</h3>
          </header>
          <div className="wrapper-padding">
            <div className="image__wrapper" style={{ maxWidth: `${window.innerWidth - 32}px` }}>
              <ButtonAddImage _uploadImage={this._uploadImage} />
              {product.get('image')
                ? product
                    .get('image')
                    .map((image, i) => <ProductImage key={`images-${i}`} image={image} />)
                : null}
            </div>
          </div>
          <div className="product__form__wrapper">
            <div className="wrapper-padding">
              <div className="row-wrapper">
                <span className="row-title">상품명</span>
                <input
                  type="text"
                  defaultValue={product.get('name')}
                  placeholder="상품명을 입력하세요."
                  ref={name => (this.name = name)}
                />
              </div>
              <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
                <span className="row-title">가격</span>
                <input
                  type="number"
                  defaultValue={product.get('price')}
                  ref={price => (this.price = price)}
                  onClick={e => e.target.select()}
                />
                <span id="currency">원</span>
              </div>
              <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
                <span className="row-title">설명</span>
                <input
                  type="text"
                  defaultValue={product.get('contents')}
                  ref={contents => (this.contents = contents)}
                />
              </div>
            </div>
            <OptionWrapper
              options={options}
              onConfirm={this.onConfirm}
              _onChangeOptionName={this._onChangeOptionName}
              _onChangeOptionPrice={this._onChangeOptionPrice}
              _onDeleteOption={this._onDeleteOption}
              _onAddOption={this._onAddOption}
            />
            <div className="button-normal">
              <span className="button button-left" onClick={togglePopup('close')}>
                취 소
              </span>
              <span className="button button-right" onClick={this.onConfirm}>
                확 인
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  initUploadImage: payload => dispatch(initUploadImage(payload)),
}))(ProductInputModal);
