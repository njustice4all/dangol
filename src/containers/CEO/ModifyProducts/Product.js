import React, { Component } from 'react';

import { ATY_URI, SITE_ID } from '../../../constants';

const ProductImage = ({ product, shopSequence }) => {
  const imageName = product.getIn(['images', 0, 'imageName']);
  if (product.getIn(['images', 0, 'imageId'])) {
    return <img src={product.getIn(['images', 0, 'image'])} alt="" />;
  }

  const idx = product.getIn(['image', 0, 'idx']);

  return <img src={`${ATY_URI}/aty_image.php?siteId=${SITE_ID}&iID=${idx}&thumb=2`} alt="" />;
};

export default class Product extends Component {
  render() {
    const { product, togglePopup, shopSequence, removeProduct } = this.props;

    return (
      <div className="items products">
        <div className="product__wrapper-normal" onClick={togglePopup(product.get('idx'))}>
          <div className="image__wrapper">
            <i className="fa fa-camera" aria-hidden="true" />
            <ProductImage product={product} shopSequence={shopSequence} />
          </div>
          <div className="product__form__wrapper">
            <div className="contents-row">
              <p>{product.get('name')}</p>
            </div>
            <div className="contents-row">
              <p className="price">
                {product.get('price')}
                <span style={{ marginLeft: '5px' }}>원</span>
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
