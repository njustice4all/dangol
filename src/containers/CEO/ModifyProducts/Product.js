import React, { Component } from 'react';

import Converter from '../../../utils/Converter';
import { ATY_URI } from '../../../constants';

const ProductImage = ({ product, siteId }) => {
  const imageName = product.getIn(['images', 0, 'imageName']);
  if (product.getIn(['images', 0, 'imageId'])) {
    return <img src={product.getIn(['images', 0, 'image'])} alt="" />;
  }

  const idx = product.getIn(['image', 0, 'idx']);

  return <img src={`${ATY_URI}/aty_image.php?siteId=${siteId}&iID=${idx}&thumb=2`} alt="" />;
};

export default class Product extends Component {
  _onPress = idx => e => {
    const { togglePopup, goProductInput } = this.props;

    togglePopup(idx)(e);
    goProductInput(idx);
  };

  render() {
    const { product, togglePopup, removeProduct, siteId } = this.props;

    return (
      <div className="items products">
        <div className="product__wrapper-normal" onClick={this._onPress(product.get('idx'))}>
          <div className="image__wrapper">
            <i className="fa fa-camera" aria-hidden="true" />
            <ProductImage product={product} siteId={siteId} />
          </div>
          <div className="product__form__wrapper">
            <div className="contents-row">
              <p style={{ color: '#fe931f' }}>{product.get('name')}</p>
            </div>
            <div className="contents-row">
              <p className="price">
                {Converter.numberWithCommas(product.get('price'))}
                <span>원</span>
              </p>
              <span className="button-detail">수정</span>
              <span className="button-detail remove" onClick={removeProduct(product.get('idx'))}>
                삭제
              </span>
            </div>
            <div className="contents-row">
              <p className="description">{product.get('contents')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
