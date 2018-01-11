// @flow

import React from 'react';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
};

const ItemDelivery = ({ goDetail, order }: Props) => (
  <li className="list-item" onClick={goDetail(order.get('no'))}>
    <div className="content-wrapper">
      <div className="left-wrapper">
        <div className="orderno">{order.get('no')}</div>
        <div className="date">{order.get('date')}</div>
        <div className="label delivery">
          <span className="title">배달</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="address">{order.get('address')}</div>
        <div className="info">
          <span className="icon mark">{order.get('distance')}</span> |{' '}
          <span className="alert">{order.get('takeTime')}</span> 소요
        </div>
        <div className="comment">{order.get('request')}</div>
      </div>
    </div>
  </li>
);

export default ItemDelivery;
