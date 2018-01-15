// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  status?: string,
};

const SideButton = ({ status }) => {
  if (status === 'accept') {
    return <div className="right-btn">주 문 완 료</div>;
  } else if (status === 'reject') {
    return <div className="right-btn">주 문 취 소</div>;
  } else {
    return null;
  }
};

const ItemPackage = ({ goDetail, order, status }: Props) => (
  <li className="list-item" onClick={goDetail(order.get('no'))}>
    <div className={cx('content-wrapper', status === 'accept' ? 'done' : 'done cancel')}>
      <div className="left-wrapper">
        <div className="orderno">{order.get('no')}</div>
        <div className="date">{order.get('date')}</div>
        <div className="label package">
          <span className="title">포장</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="orderinfo">
          <span className="alert">{order.get('pickupAfter')}</span> 후 픽업
        </div>
        <div className="comment">{order.get('request')}</div>
      </div>
      <SideButton status={status} />
    </div>
  </li>
);

export default ItemPackage;
