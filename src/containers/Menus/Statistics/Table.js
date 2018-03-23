import React, { Component } from 'react';
import cx from 'classnames';

import Converter from '../../../utils/Converter';

const Total = ({ name, value, count }) => (
  <div className="total-table-rows">
    <div className="rows">{name}</div>
    <div className="rows value">
      <span>{value > 0 ? Converter.numberWithCommas(value) : 0}</span>
      {count ? ' 원' : ' 건'}
    </div>
  </div>
);

const Rows = ({ name, value, icon, child, border }) => (
  <div className={cx('price-table-rows', { child, hasIcon: icon, border })}>
    <div className="rows">{name}</div>
    <div className="rows value">
      <span>{value ? Converter.numberWithCommas(value) : 0}</span> 원
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
    const { datasets, data } = this.props;

    // TODO: 리팩토링
    const creditCard =
      datasets && datasets.get('creditCard').reduce((prev, curr) => Number(prev) + Number(curr));
    const mobile =
      datasets && datasets.get('mobile').reduce((prev, curr) => Number(prev) + Number(curr));
    const noBankbook =
      datasets && datasets.get('noBankbook').reduce((prev, curr) => Number(prev) + Number(curr));
    const virtAccTransfer =
      datasets &&
      datasets.get('virtAccTransfer').reduce((prev, curr) => Number(prev) + Number(curr));

    const reducerByType = type => (accumulator, value) => {
      if (accumulator.hasOwnProperty(type)) {
        return accumulator[type] + value[type];
      }
      return accumulator + value[type];
    };

    let totalCount = 0;
    let totalSales = 0;
    if (data) {
      const dataLists = data.toJS();
      totalCount = dataLists.reduce(reducerByType('count'));
      totalSales = dataLists.reduce(reducerByType('salesPrice'));
    }

    // FIXME: 카드결제, 만나서 결제 추가

    return (
      <div className="table-container">
        <div className="total-wrapper">
          <Total name="총 주문 수" value={totalCount} />
          <Total name="총 주문 금액" value={totalSales} count />
        </div>
        <div className="price-table-wrapper">
          <Rows name="지금 바로 결제" value={'340,000'} icon />
          <Rows name="카드 결제" value={creditCard} child />
          <Rows name="휴대폰 결제" value={mobile} child />
          <Rows name="만나서 결제" value={'3,000'} border />
        </div>
      </div>
    );
  }
}

export default Table;
