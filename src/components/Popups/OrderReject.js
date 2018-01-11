import React from 'react';

const OrderReject = () => (
  <div className="popup-pannel order-cancel">
    <div className="header">
      <div className="title">취소사유</div>
    </div>
    <div className="body">
      <ul className="list-items">
        <li className="list-item active">
          <i className="icon food" />
          <div className="title">재료부족</div>
        </li>
        <li className="list-item">
          <i className="icon shop" />
          <div className="title">업소사정</div>
        </li>
        <li className="list-item">
          <i className="icon mark" />
          <div className="title">배달불가지역</div>
        </li>
        <li className="list-item">
          <i className="icon alarm" />
          <div className="title">주문량폭주</div>
        </li>
      </ul>
    </div>
    <div className="btn-wrapper">
      <div className="btn small">취소</div>
      <div className="btn big">확인</div>
    </div>
  </div>
);

export default OrderReject;
