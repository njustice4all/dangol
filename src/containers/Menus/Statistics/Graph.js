// @flow

import React, { Component } from 'react';
import { AreaChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Converter from '../../../utils/Converter';

type Props = {
  data: Object,
};

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
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              fill="#8884d8"
              stackId="1"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="count"
              stroke="#82ca9d"
              fill="#82ca9d"
              stackId="1"
            />
          </AreaChart>
        </div>
      </div>
    );
  }
}

export default Graph;
