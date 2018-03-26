// @flow

import React, { Component } from 'react';
import { AreaChart, Label, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import Converter from '../../../utils/Converter';

type Props = {
  data: Object,
};

const CustomLegend = ({ payload }) => (
  <ul className="legend-wrapper">
    {payload.map((entry, index) => (
      <li key={`item-${index}`}>
        <span className={`legend ${entry.value}`}> </span>
        {entry.value === 'totalSales' ? '매출액' : '판매건수'}
      </li>
    ))}
  </ul>
);

const CustomTooltips = ({ payload, label }) => (
  <div className="custom-tooltip">
    <p style={{ marginBottom: '10px' }}>{label}</p>
    {payload.map((entry, index) => {
      if (entry.name === 'totalSales') {
        return (
          <li key={`item-${index}`}>
            <span className={`legend ${entry.name}`}> </span>매출액:{' '}
            <span className="legend-value">
              {Converter.numberWithCommas(entry.payload.salesPrice)}
            </span>
          </li>
        );
      }

      return (
        <li key={`item-${index}`} style={{ marginBottom: '5px' }}>
          <span className={`legend ${entry.name}`}> </span>판매건수:{' '}
          <span className="legend-value">{Converter.numberWithCommas(entry.payload.count)}</span>
        </li>
      );
    })}
  </div>
);

class Graph extends Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="graph-container">
        <div className="graph-scroll-wrapper">
          <AreaChart
            width={Converter.calWidth(data)}
            height={300}
            data={data && data.toJS()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" tickFormatter={tick => Converter.numberWithCommas(tick)} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={CustomTooltips} />
            <Legend content={CustomLegend} />
            <Area yAxisId="right" type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </div>
      </div>
    );
  }
}

export default Graph;
