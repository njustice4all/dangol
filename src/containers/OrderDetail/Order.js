import React from 'react';
import cx from 'classnames';

const Total = ({ price, paymentMethod }) => (
  <div className="content">
    <div className="price">{price}원</div>
    <div className="tooltip">{paymentMethod}</div>
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

const Order = ({ detail }) => {
  const type = detail.getIn(['order', 'type']);

  return (
    <div className="content-wrapper">
      <div className="content-title">주문정보</div>
      <ul className="list-items">
        <Info title={'주문번호'} content={detail.getIn(['order', 'no'])} />
        <Info title={'주문시간'} content={detail.getIn(['order', 'date'])} />
        {type === 'order' ? <Info title={'테이블번호'} content={'5'} /> : null}
        {type === 'order' ? (
          <Info title={'요청사항'} content={detail.getIn(['customer', 'request'])} />
        ) : null}
        <Info
          total
          title={'총 결제 예정 금액'}
          content={{
            price: detail.getIn(['order', 'totalPay']),
            paymentMethod: detail.getIn(['order', 'paymentMethod']),
          }}
        />
      </ul>
    </div>
  );
};

export default Order;
