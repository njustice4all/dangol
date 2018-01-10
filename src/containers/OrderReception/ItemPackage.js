// @flow

import React from 'react';

type Props = {
  no: string,
  date: string,
  type: string,
  pickupAfter: string,
  request: string,
};

const ItemPackage = ({ order }: { order: Props }) => (
  <li className="list-item">
    <div className="content-wrapper">
      <div className="left-wrapper">
        <div className="orderno">{order.no}</div>
        <div className="date">{order.date}</div>
        <div className="label package">
          <span className="title">포장</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="orderinfo">
          <span className="alert">{order.pickupAfter}</span> 후 픽업
        </div>
        <div className="comment">{order.request}</div>
      </div>
    </div>
  </li>
);

export default ItemPackage;
