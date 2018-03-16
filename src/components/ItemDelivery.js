// @flow

import React from 'react';
import type { Map } from 'immutable';
import cx from 'classnames';

import getCoords, { type Coords } from '../utils/getCoords';
import getWrapperClassName from '../utils/getWrapperClassName';
import { getTime } from '../utils/time';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  shopCoords: Map<string, number>,
  status: Map<string, number>,
  pathname: string,
  payment: string,
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

const ItemDelivery = ({
  goDetail,
  order,
  shopCoords,
  status,
  pathname,
  isProgress,
  isReception,
}: Props) => {
  // FIXME:
  // const coords: Coords = getCoords({
  //   lat1: shopCoords.get('lat'),
  //   lng1: shopCoords.get('lng'),
  //   lat2: order.getIn(['coords', 'lat']),
  //   lng2: order.getIn(['coords', 'lng']),
  // });
  const coords = { distance: 5, duration: 10 };
  const payment = order.getIn(['data', 'app_btn']);

  return (
    <li className="list-item" onClick={goDetail(order.getIn(['data', 'idx']))}>
      <div className={getWrapperClassName(pathname, status, isProgress, payment)}>
        <div className="left-wrapper">
          <div className="orderno">{order.get('no')}</div>
          <div className="date">{getTime(order.get('date'))}</div>
          <div className={cx('label delivery', { progress: isProgress })}>
            <span className="title">배달</span>
          </div>
        </div>
        <div className="right-wrapper" style={{ paddingTop: '15px' }}>
          <div className="address">{order.get('address')}</div>
          {/*<div className="info">
            <span className="icon mark">{coords.distance}km</span> |{' '}
            <span className="alert">{coords.duration}분</span> 소요
          </div>*/}
          <div className="comment">{order.get('request')}</div>
        </div>
        <SideButton status={status} payment={payment} isReception={isReception} />
      </div>
    </li>
  );
};

export default ItemDelivery;
