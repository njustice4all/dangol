// @flow

import React from 'react';
import type { Map } from 'immutable';
import cx from 'classnames';

import getWrapperClassName from '../utils/getWrapperClassName';
import { getTime } from '../utils/time';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  status: Map<string, number>,
  pathname: string,
  isReception: boolean,
  isProgress: boolean,
};

const SideButton = ({ status, payment, isReception }) => {
  if (isReception) return null;

  let text = '';
  if (status && status.get('deliveryDone') > 0) {
    text = '주 문 완 료';
  } else if (status && status.get('cancel') > 0) {
    text = '주 문 취 소';
  } else if (payment === 'counter' || payment === 'meetPay') {
    text = '주문처리중';
  } else if (payment === 'mobile') {
    text = '취소처리중';
  } else if (!status) {
    return null;
  }

  return <div className="right-btn">{text}</div>;
};

const ItemTable = ({ goDetail, order, status, pathname, isProgress, isReception }: Props) => {
  const payment = order.getIn(['data', 'app_btn']);

  return (
    <li className="list-item" onClick={goDetail(order.getIn(['data', 'idx']))}>
      <div className={getWrapperClassName(pathname, status, isProgress, payment)}>
        <div className="left-wrapper">
          <div className="orderno">{order.get('no')}</div>
          <div className="date">{getTime(order.get('date'))}</div>
          <div className={cx('label order', { progress: isProgress })}>
            <span className="title">매장</span>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="orderinfo">
            테이블 번호 <span className="alert">{order.get('tableNo')}</span>
          </div>
          <div className="comment">{order.get('request')}</div>
        </div>
        <SideButton status={status} payment={payment} isReception={isReception} />
      </div>
    </li>
  );
};

export default ItemTable;
