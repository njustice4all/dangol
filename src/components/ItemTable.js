// @flow

import React from 'react';

import getWrapperClassName from '../utils/getWrapperClassName';
import { getTime } from '../utils/time';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  status?: string,
  pathname: string,
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

const ItemTable = ({ goDetail, order, status, pathname }: Props) => (
  <li className="list-item" onClick={goDetail(order.getIn(['data', 'idx']))}>
    <div className={getWrapperClassName(pathname, status)}>
      <div className="left-wrapper">
        <div className="orderno">{order.get('no')}</div>
        <div className="date">{getTime(order.get('date'))}</div>
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
      <SideButton status={status} />
    </div>
  </li>
);

export default ItemTable;
