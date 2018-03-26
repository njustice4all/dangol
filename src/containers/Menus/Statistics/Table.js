// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import type { Map, List } from 'immutable';

import Converter from '../../../utils/Converter';

type Props = {
  datasets: Map<string, any>,
  data: List<Map<string, any>>,
};

type TotalProps = {
  name: string,
  value: number,
  count?: boolean,
};

type RowsProps = {
  name: string,
  value: number,
  icon?: boolean,
  child?: boolean,
  border?: boolean,
};

const totalCountByType = (data: Map<string, any>, type: string): number => {
  if (data) {
    return data.get(type).reduce((prev, curr) => Number(prev) + Number(curr));
  }

  return 0;
};

const reducerByType = (type: string) => (accumulator: any, value: any) => {
  if (accumulator.hasOwnProperty(type)) {
    return accumulator[type] + value[type];
  }
  return accumulator + value[type];
};

const Total = ({ name, value, count }: TotalProps) => (
  <div className="total-table-rows">
    <div className="rows">{name}</div>
    <div className="rows value">
      <span>{value > 0 ? Converter.numberWithCommas(value) : 0}</span>
      {count ? ' 원' : ' 건'}
    </div>
  </div>
);

const Rows = ({ name, value, icon, child, border }: RowsProps) => (
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

const Table = ({ datasets, data }: Props) => {
  const creditCard = totalCountByType(datasets, 'creditCard');
  const mobile = totalCountByType(datasets, 'mobile');
  const noBankbook = totalCountByType(datasets, 'noBankbook');
  const virtAccTransfer = totalCountByType(datasets, 'virtAccTransfer');
  const meetPay = totalCountByType(datasets, 'meetPay');

  let totalCount = 0;
  let totalSales = 0;
  if (data) {
    const dataLists = data.toJS();
    totalCount = dataLists.reduce(reducerByType('count'));
    totalSales = dataLists.reduce(reducerByType('salesPrice'));
  }

  return (
    <div className="table-container">
      <div className="total-wrapper">
        <Total name="총 주문 수" value={totalCount} />
        <Total name="총 주문 금액" value={totalSales} count />
      </div>
      <div className="price-table-wrapper">
        <Rows name="지금 바로 결제" value={creditCard + mobile} icon />
        <div className={cx('payment-type-wrapper', { close: false })}>
          <Rows name="카드 결제" value={creditCard} child />
          <Rows name="휴대폰 결제" value={mobile} child />
        </div>
        <Rows name="만나서 결제" value={meetPay} border />
      </div>
    </div>
  );
};

export default Table;
