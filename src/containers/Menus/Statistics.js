// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import DatePicker from './DatePicker';

type State = {
  dateRanges: Array<{ id: string, name: string, selected: boolean }>,
};

class Statistics extends Component<{}, State> {
  state = {
    dateRanges: [
      { id: 'today', name: '오늘', selected: true },
      { id: 'day', name: '일간', selected: false },
      { id: 'week', name: '주간', selected: false },
      { id: 'month', name: '월간', selected: false },
    ],
  };

  changeRange = (id: string) => (): void => {
    this.setState(prevState => ({
      dateRanges: prevState.dateRanges.map(element => {
        if (element.id === id) {
          return { ...element, selected: true };
        }
        return { ...element, selected: false };
      }),
    }));
  };

  render() {
    const { dateRanges } = this.state;

    return (
      <div className="statistics-container">
        <div className="date-range-wrapper">
          {dateRanges.map(({ id, name, selected }, i) => (
            <div key={i} className={cx('picker-box', { selected })} onClick={this.changeRange(id)}>
              {name}
            </div>
          ))}
        </div>
        <DatePicker />
      </div>
    );
  }
}

export default Statistics;
