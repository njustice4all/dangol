// @flow

import React from 'react';

type Props = {
  no: string,
  date: string,
  type: string,
  address: string,
  distance: string,
  takeTime: string,
  request: string,
};

const ItemDelivery = ({ order }: { order: Props }) => (
  <li className="list-item">
    <div className="content-wrapper">
      <div className="left-wrapper">
        <div className="orderno">{order.no}</div>
        <div className="date">{order.date}</div>
        <div className="label delivery">
          <span className="title">배달</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="address">{order.address}</div>
        <div className="info">
          <span className="icon mark">{order.distance}</span> |{' '}
          <span className="alert">{order.takeTime}</span> 소요
        </div>
        <div className="comment">{order.request}</div>
      </div>
    </div>
  </li>
);

export default ItemDelivery;
