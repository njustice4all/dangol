// @flow

import moment from 'moment';

import type Moment from 'moment';

type InitialDate = {
  toDay: Moment,
  previousWeek: Moment,
  rangeWeeks: Moment,
  rangeMonth: Moment,
};

type CustomDate = {
  start: {
    year: ?string,
    month: ?string,
    date: ?string,
  },
  end: {
    year: ?string,
    month: ?string,
    date: ?string,
  },
};

type SetDate = {
  startDate: Moment,
  endDate: Moment,
};

class DateHandler {
  initialDate = (): InitialDate => {
    const toDay = moment(new Date());
    const previousWeek = moment(toDay).subtract(7, 'days');
    const rangeWeeks = moment(toDay).subtract(7, 'weeks');
    const rangeMonth = moment(toDay).subtract(7, 'month');

    return { toDay, previousWeek, rangeWeeks, rangeMonth };
  };

  getDate = (startDate: Moment, endDate: Moment): CustomDate => {
    const start = { year: null, month: null, date: null };
    const end = { year: null, month: null, date: null };

    if (startDate) {
      start.year = startDate.get('year');
      start.month = startDate.get('month') + 1;
      start.date = startDate.get('date');
    }

    if (endDate) {
      end.year = endDate.get('year');
      end.month = endDate.get('month') + 1;
      end.date = endDate.get('date');
    }

    return { start, end };
  };

  setDateById = (id: string): SetDate => {
    switch (id) {
      case 'hour':
        return { startDate: this.initialDate().toDay, endDate: this.initialDate().toDay };
      case 'day':
        return { startDate: this.initialDate().previousWeek, endDate: this.initialDate().toDay };
      case 'week':
        return {
          startDate: this.initialDate().rangeWeeks,
          endDate: this.initialDate().previousWeek,
        };
      case 'month':
        return {
          startDate: this.initialDate().rangeMonth,
          endDate: this.initialDate().previousWeek,
        };
      default:
        return { startDate: null, endDate: null };
    }
  };
}

export default new DateHandler();
