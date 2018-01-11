// @flow

import React from 'react';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
};

const ItemPackage = ({ goDetail, order }: Props) => (
  <li className="list-item" onClick={goDetail(order.get('no'))}>
    <div className="content-wrapper">
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
    </div>
  </li>
);

export default ItemPackage;
