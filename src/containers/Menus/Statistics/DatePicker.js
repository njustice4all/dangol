// @flow

import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'moment/locale/ko';

import type Moment from 'moment';

type Props = {
  onDatesChange: (startDate: Moment, endDate: Moment) => void,
  onFocusChange: (focusedInput: string) => void,
  onPressPickerButton: () => void,
  startDate: ?Moment,
  endDate: ?Moment,
  focusedInput: ?string,
};

const DatePicker = ({
  startDate,
  endDate,
  focusedInput,
  onDatesChange,
  onFocusChange,
  onPressPickerButton,
}: Props) => (
  <div className="picker-container" onClick={onPressPickerButton}>
    <span className="arrow-wrapper">
      <img src="/img/back.svg" />
    </span>
    <DateRangePicker
      startDateId="date-start"
      endDateId="date-end"
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
      focusedInput={focusedInput}
      onFocusChange={onFocusChange}
      orientation="vertical"
      withFullScreenPortal
      displayFormat="YYYY.MM.DD"
      startDatePlaceholderText="시작일"
      endDatePlaceholderText="종료일"
      renderMonth={(month: Moment): void => moment(month).format('YYYY MMMM')}
      isOutsideRange={() => false}
      customArrowIcon={<span>~</span>}
      block
    />
  </div>
);

export default DatePicker;
