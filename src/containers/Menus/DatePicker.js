// @flow

import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'moment/locale/ko';

import type Moment from 'moment';

type State = {
  startDate: ?Moment,
  endDate: ?Moment,
  focusedInput: ?string,
};

class DatePicker extends Component<{}, State> {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  _onDatesChange = ({ startDate, endDate }: State): void => this.setState({ startDate, endDate });

  _onFocusChange = (focusedInput: string) => this.setState({ focusedInput });

  render() {
    const { startDate, endDate, focusedInput } = this.state;

    return (
      <DateRangePicker
        startDateId="date-start"
        endDateId="date-end"
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this._onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={this._onFocusChange}
        orientation="vertical"
        showClearDates
        withFullScreenPortal
        displayFormat="YYYY.MM.DD"
        startDatePlaceholderText="시작일"
        endDatePlaceholderText="종료일"
        renderMonth={(month: Moment): void => moment(month).format('YYYY MMMM')}
        isOutsideRange={() => false}
      />
    );
  }
}

export default DatePicker;
