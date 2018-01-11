// @flow

import React from 'react';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
};

const ItemTable = ({ goDetail, order }: Props) => (
  <li className="list-item" onClick={goDetail(order.get('no'))}>
    <div className="content-wrapper">
      <div className="left-wrapper">
        <div className="orderno">{order.get('no')}</div>
        <div className="date">{order.get('date')}</div>
        <div className="label order">
          <span className="title">매장</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="orderinfo">
          테이블 번호 <span className="alert">{order.get('tableNo')}</span>
        </div>
        <div className="comment">{order.get('request')}</div>
      </div>
    </div>
  </li>
);

export default ItemTable;
