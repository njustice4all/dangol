// @flow

import moment from 'moment';

import type Moment from 'moment';

type InitialDate = {
  toDay: Moment,
  previousWeek: Moment,
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
    const previousWeek = moment(new Date(Date.parse(toDay) - 7 * 1000 * 60 * 60 * 24));

    return { toDay, previousWeek };
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
        return { startDate: moment(), endDate: moment() };
      case 'month':
        return { startDate: moment(), endDate: moment() };
      default:
        return { startDate: moment(), endDate: moment() };
    }
  };
}

export default new DateHandler();
