// @flow

import React from 'react';

type Props = {
  no: string,
  date: string,
  type: string,
  tableNo: string,
  request: string,
};

const ItemTable = ({ order }: { order: Props }) => (
  <li className="list-item">
    <div className="content-wrapper">
      <div className="left-wrapper">
        <div className="orderno">{order.no}</div>
        <div className="date">{order.date}</div>
        <div className="label order">
          <span className="title">매장</span>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="orderinfo">
          테이블 번호 <span className="alert">{order.tableNo}</span>
        </div>
        <div className="comment">{order.request}</div>
      </div>
    </div>
  </li>
);

export default ItemTable;
