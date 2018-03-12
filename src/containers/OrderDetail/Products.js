import React from 'react';

import Converter from '../../utils/Converter';

const Header = () => (
  <div className="table head">
    <div className="subject">상품명</div>
    <div className="qnt">수량</div>
    <div className="price">가격</div>
  </div>
);

const Product = ({ detail, head }) => {
  const price = Converter.numberWithCommas(detail && detail.getIn(['orderDetail', 'price']));

  return (
    <li className="list-item">
      {head ? (
        <Header />
      ) : (
        <div className="table">
          <div className="subject">
            {detail && detail.getIn(['orderDetail', 'product', 'name'])}
          </div>
          <div className="qnt">
            {detail && detail.getIn(['orderDetail', 'product', 'quantity'])}
          </div>
          <div className="price">{price}원</div>
        </div>
      )}
    </li>
  );
};

const Option = ({ option, options }) => {
  return (
    <li className="list-item">
      <div className="table">
        <div className="subject">{options ? option.get('option2') : option.get('name')}</div>
        <div className="qnt">{option.get('quantity')}</div>
        <div className="price">{Converter.numberWithCommas(option.get('price'))}원</div>
        {/*<div className="subject">{option.get('option2')}</div>
        <div className="qnt">{option.get('quantity')}</div>
        <div className="price">{Converter.numberWithCommas(option.get('price'))}원</div>*/}
      </div>
    </li>
  );
};

const Products = ({ detail }) => {
  let options = detail.getIn(['orderDetail', 'product', 'option', 'list']);
  if (options && !options.getIn([0, 'idx'])) {
    options = [];
  }

  const orderDetails = detail.get('orderDetail');

  const price = Converter.numberWithCommas(detail.getIn(['order', 'totalprice']));

  return (
    <div className="content-wrapper">
      <div className="content-title">주문상품정보</div>
      <ul className="list-items">
        <Product head />
        {/*<Product detail={detail} />*/}
        {/*options && options.map((option, i) => <Option option={option} key={`option-${i}`} />)*/}
        {orderDetails &&
          orderDetails.map((detail, i) => <Option option={detail} key={`option-${i}`} />)}
        {orderDetails &&
          orderDetails.map((value, i) => {
            return value
              .getIn(['product', 'option', 'list'])
              .map((option, i) => <Option option={option} key={`options-${i}`} options />);
          })}
        <li className="list-item">
          <div className="table total">
            <div className="subject">총 주문금액</div>
            <div className="price">{price}원</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Products;
