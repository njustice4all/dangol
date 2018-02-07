// @flow

import React from 'react';
import type { Map } from 'immutable';

import getCoords, { type Coords } from '../utils/getCoords';
import getWrapperClassName from '../utils/getWrapperClassName';
import { getTime } from '../utils/time';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  shopCoords: Map<string, number>,
  status: Map<string, number>,
  pathname: string,
};

const SideButton = ({ status }) => {
  if (!status) return null;

  if (status.get('deliveryDone') > 0) {
    return <div className="right-btn">주 문 완 료</div>;
  } else if (status.get('cancel') > 0) {
    return <div className="right-btn">주 문 취 소</div>;
  } else {
    return null;
  }
};

const ItemDelivery = ({ goDetail, order, shopCoords, status, pathname }: Props) => {
  // FIXME:
  // const coords: Coords = getCoords({
  //   lat1: shopCoords.get('lat'),
  //   lng1: shopCoords.get('lng'),
  //   lat2: order.getIn(['coords', 'lat']),
  //   lng2: order.getIn(['coords', 'lng']),
  // });
  const coords = { distance: 5, duration: 10 };

  return (
    <li className="list-item" onClick={goDetail(order.getIn(['data', 'idx']))}>
      <div className={getWrapperClassName(pathname, status)}>
        <div className="left-wrapper">
          <div className="orderno">{order.get('no')}</div>
          <div className="date">{getTime(order.get('date'))}</div>
          <div className="label delivery">
            <span className="title">배달</span>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="address">{order.get('address')}</div>
          <div className="info">
            <span className="icon mark">{coords.distance}km</span> |{' '}
            <span className="alert">{coords.duration}분</span> 소요
          </div>
          <div className="comment">{order.get('request')}</div>
        </div>
        <SideButton status={status} />
      </div>
    </li>
  );
};

export default ItemDelivery;
