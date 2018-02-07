import React from 'react';
import cx from 'classnames';

import Converter from '../../utils/Converter';

const Total = ({ price, paymentMethod }) => (
  <div className="content">
    <div className="price">{Converter.numberWithCommas(price)}원</div>
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
  const type = detail.getIn(['order', 'sub_state']);

  return (
    <div className="content-wrapper">
      <div className="content-title">주문정보</div>
      <ul className="list-items">
        <Info title={'주문번호'} content={detail.getIn(['order', 'order_no'])} />
        <Info title={'주문시간'} content={detail.getIn(['order', 'order_date'])} />
        {type === 'order' ? <Info title={'테이블번호'} content={'없음'} /> : null}
        {type === 'order' ? (
          <Info title={'요청사항'} content={detail.getIn(['order', 'od_b_message'])} />
        ) : null}
        <Info
          total
          title={'총 결제 예정 금액'}
          content={{
            price: detail.getIn(['order', 'totalprice']),
            paymentMethod: detail.getIn(['order', 'app_btn']),
          }}
        />
      </ul>
    </div>
  );
};

export default Order;
