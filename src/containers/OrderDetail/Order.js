import React from 'react';
import cx from 'classnames';

const Total = ({ price, paymentMethod }) => (
  <div className="content">
    <div className="price">25,000원</div>
    <div className="tooltip">만나서 결제 / 카드</div>
  </div>
);

const Info = ({ title, content, total }) => {
  return (
    <li className={cx('list-item', { total })}>
      <div className="title">{title}</div>
      {total ? (
        <Total price={content.price} paymentMethod={content.paymentMethod} />
      ) : (
        <div className="content">{content}</div>
      )}
    </li>
  );
};

const Order = () => (
  <div className="content-wrapper">
    <div className="content-title">주문정보</div>
    <ul className="list-items">
      <Info title={'주문번호'} content={'WJRT78542'} />
      <Info title={'주문시간'} content={'2018-01-10 11:45'} />
      <Info
        total
        title={'총 결제 예정 금액'}
        content={{ price: 25000, paymentMethod: '만나서 결제 / 카드' }}
      />
    </ul>
  </div>
);

export default Order;
