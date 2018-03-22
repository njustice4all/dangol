import React, { Component } from 'react';
import cx from 'classnames';

const Total = ({ name, value, count }) => (
  <div className="total-table-rows">
    <div className="rows">{name}</div>
    <div className="rows value">
      <span>{value}</span>
      {count ? ' 원' : ' 건'}
    </div>
  </div>
);

const Rows = ({ name, value, icon, child, border }) => (
  <div className={cx('price-table-rows', { child, hasIcon: icon, border })}>
    <div className="rows">{name}</div>
    <div className="rows value">
      <span>{value}</span> 원
      {icon ? (
        <span className="row-arrow">
          <img src="/img/back.svg" />
        </span>
      ) : null}
    </div>
  </div>
);

class Table extends Component {
  render() {
    return (
      <div className="table-container">
        <div className="total-wrapper">
          <Total name="총 주문 수" value={'3,123'} />
          <Total name="총 주문 금액" value={'3,209,800'} count />
        </div>
        <div className="price-table-wrapper">
          <Rows name="지금 바로 결제" value={'340,000'} icon />
          <Rows name="카드 결제" value={'300,000'} child />
          <Rows name="휴대폰 결제" value={'40,000'} child />
          <Rows name="만나서 결제" value={'3,000'} border />
        </div>
      </div>
    );
  }
}

export default Table;
