import React from 'react';

const Customer = () => (
  <div className="content-wrapper">
    <div className="content-title">주문자 정보</div>
    <ul className="list-items">
      <li className="list-item">
        <div className="title">주문자</div>
        <div className="content">
          <div className="text">010-1207-7896</div>
          <div className="btn call">전화하기</div>
        </div>
      </li>
      <li className="list-item">
        <div className="title">배달지</div>
        <div className="content">
          서울특별시 삼성로 81길 31, 4층 41 추가주소
          <div className="info">
            1.5km | <span className="alert">20분</span> 소요
          </div>
        </div>
      </li>
      <li className="list-item">
        <div className="title">요청사항</div>
        <div className="content">카드로 계산하겠습니다.</div>
      </li>
    </ul>
  </div>
);

export default Customer;
