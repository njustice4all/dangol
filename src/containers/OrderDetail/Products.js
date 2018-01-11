import React from 'react';

const Header = () => (
  <div className="table head">
    <div className="subject">상품명</div>
    <div className="qnt">수량</div>
    <div className="price">가격</div>
  </div>
);

const Product = ({ product, head }) => (
  <li className="list-item">
    {head ? (
      <Header />
    ) : (
      <div className="table">
        <div className="subject">{product.get('name')}</div>
        <div className="qnt">{product.get('quantity')}</div>
        <div className="price">{product.get('quantity') * product.get('price')}원</div>
      </div>
    )}
  </li>
);

const Products = ({ detail }) => (
  <div className="content-wrapper">
    <div className="content-title">주문상품정보</div>
    <ul className="list-items">
      <Product head />
      {detail
        .get('products')
        .map((product, index) => <Product key={`product-${index}`} product={product} />)}
      <li className="list-item">
        <div className="table total">
          <div className="subject">총 주문금액</div>
          <div className="price">18,000원</div>
        </div>
      </li>
    </ul>
  </div>
);

export default Products;
