// @flow

import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import Converter from '../../../utils/Converter';

type Props = {
  data: Object,
};

const options = {
  responsive: false,
  tooltips: {
    mode: 'index',
    titleMarginBottom: 10,
    cornerRadius: 0,
    bodySpacing: 8,
    xPadding: 12,
    yPadding: 12,
    bodyFontSize: 16,
    titleFontSize: 16,
    backgroundColor: '#fff',
    bodyFontColor: '#000',
    titleFontColor: '#000',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  legend: { display: true, position: 'bottom' },
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: { display: false },
        labels: { show: true },
        ticks: { callback: (value, index, values) => Converter.numberWithCommas(value) },
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: { display: false },
        labels: { show: true },
        ticks: { callback: (value, index, values) => Converter.numberWithCommas(value) },
      },
    ],
    xAxes: [],
  },
};

class Graph extends Component<Props> {
  render() {
    const { data } = this.props;
    const dataSize = data.getIn(['datasets', 1, 'data']).size;
    const size = dataSize * 100 > 0 ? dataSize * 100 : 500;

    return (
      <div className="graph-container">
        <div className="graph-scroll-wrapper">
          <Bar width={1000} height={300} data={data.toJS()} options={options} redraw />
        </div>
      </div>
    );
  }
}

export default Graph;
