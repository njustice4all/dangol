import React from 'react';

import getCoords from '../../utils/getCoords';

const CustomerInfo = ({ customerInfo }) => (
  <li className="list-item">
    <div className="title">주문자</div>
    <div className="content">
      <div className="text">{customerInfo.get('phone')}</div>
      <div className="btn call">전화하기</div>
    </div>
  </li>
);

const Payment = ({ request }) => (
  <li className="list-item">
    <div className="title">요청사항</div>
    <div className="content">{request}</div>
  </li>
);

// FIXME: distance matrix api
const Delivery = ({ detail, coords }) => (
  <div className="content-wrapper">
    <div className="content-title">주문자 정보</div>
    <ul className="list-items">
      <CustomerInfo customerInfo={detail.get('customer')} />
      <li className="list-item">
        <div className="title">배달지</div>
        <div className="content">
          {detail.getIn(['customer', 'address'])}
          <div className="info">
            {coords.distance}km | <span className="alert">{coords.duration}분</span> 소요
          </div>
        </div>
      </li>
      <Payment request={detail.getIn(['customer', 'request'])} />
    </ul>
  </div>
);

// FIXME: 수령시간
const Package = ({ detail }) => (
  <div className="content-wrapper">
    <div className="content-title">주문자 정보</div>
    <ul className="list-items">
      <CustomerInfo customerInfo={detail.get('customer')} />
      <li className="list-item">
        <div className="title">수령시간</div>
        <div className="content">
          <span className="text">18:30</span>
        </div>
      </li>
      <Payment request={detail.getIn(['customer', 'request'])} />
    </ul>
  </div>
);

const Customer = ({ detail, shopCoords }) => {
  const type = detail.getIn(['order', 'type']);

  if (type === 'delivery') {
    const coords = getCoords({
      lat1: shopCoords.get('lat'),
      lng1: shopCoords.get('lng'),
      lat2: detail.getIn(['customer', 'coords', 'lat']),
      lng2: detail.getIn(['customer', 'coords', 'lng']),
    });

    return <Delivery detail={detail} coords={coords} />;
  } else if (type === 'package') {
    return <Package detail={detail} />;
  } else {
    return null;
  }
};

export default Customer;
