// @flow

import React from 'react';
import type { Map } from 'immutable';

import getCoords, { type Coords } from '../../utils/getCoords';

type Props = {
  goDetail: (no: string) => void,
  order: Object,
  shopCoords: Map<string, number>,
};

const ItemDelivery = ({ goDetail, order, shopCoords }: Props) => {
  const coords: Coords = getCoords({
    lat1: shopCoords.get('lat'),
    lng1: shopCoords.get('lng'),
    lat2: order.getIn(['coords', 'lat']),
    lng2: order.getIn(['coords', 'lng']),
  });

  return (
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
            {/* <span className="icon mark">{order.get('distance')}</span> |{' '} */}
            <span className="icon mark">{coords.distance}km</span> |{' '}
            {/* <span className="alert">{order.get('takeTime')}</span> 소요 */}
            <span className="alert">{coords.duration}분</span> 소요
          </div>
          <div className="comment">{order.get('request')}</div>
        </div>
      </div>
    </li>
  );
};

export default ItemDelivery;
