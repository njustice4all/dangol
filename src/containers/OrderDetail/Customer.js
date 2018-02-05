import React from 'react';

import getCoords from '../../utils/getCoords';

const CustomerInfo = ({ detail }) => {
  const phone =
    detail &&
    `${detail.getIn(['order', 'od_b_hp1'])}-
     ${detail.getIn(['order', 'od_b_hp2'])}-
     ${detail.getIn(['order', 'od_b_hp3'])}`;

  return (
    <li className="list-item">
      <div className="title">주문자</div>
      <div className="content">
        <div className="text" style={{ paddingTop: '8px' }}>
          {phone}
        </div>
        <div className="btn call">전화하기</div>
      </div>
    </li>
  );
};

const Payment = ({ request }) => (
  <li className="list-item">
    <div className="title">요청사항</div>
    <div className="content">{request}</div>
  </li>
);

const Delivery = ({ detail, coords }) => (
  <div className="content-wrapper">
    <div className="content-title">주문자 정보</div>
    <ul className="list-items">
      <CustomerInfo detail={detail} />
      <li className="list-item">
        <div className="title">배달지</div>
        <div className="content">
          {`${detail.getIn(['order', 'od_b_addr1'])}, ${detail.getIn(['order', 'od_b_addr2'])}`}
          <div className="info">
            {coords.distance}km | <span className="alert">{coords.duration}분</span> 소요
          </div>
        </div>
      </li>
      <Payment request={detail.getIn(['order', 'od_b_message'])} />
    </ul>
  </div>
);

// FIXME: 수령시간 현재 없음
const Package = ({ detail }) => (
  <div className="content-wrapper">
    <div className="content-title">주문자 정보</div>
    <ul className="list-items">
      <CustomerInfo detail={detail} />
      <li className="list-item">
        <div className="title">수령시간</div>
        <div className="content">
          <span className="text">빼야함</span>
        </div>
      </li>
      <Payment request={detail.getIn(['order', 'od_b_message'])} />
    </ul>
  </div>
);

const Customer = ({ detail, shopCoords }) => {
  const type = detail.getIn(['order', 'order_state']);

  if (type === '매장주문') {
    return null;
  } else if (type === '포장주문') {
    return <Package detail={detail} />;
  } else {
    // FIXME:
    // const coords = getCoords({
    //   lat1: shopCoords.get('lat'),
    //   lng1: shopCoords.get('lng'),
    //   // FIXME: 사용자 주소로 위도경도 가져와야함 상위 detail container 에서 수행
    //   lat2: detail.getIn(['customer', 'coords', 'lat']),
    //   lng2: detail.getIn(['customer', 'coords', 'lng']),
    // });
    const coords = { distance: 5, duration: 10 };

    return <Delivery detail={detail} coords={coords} />;
  }
};

export default Customer;
