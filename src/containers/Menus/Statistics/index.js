// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchStatistics } from '../../../actions/ceo';

import DatePicker from './DatePicker';
import Graph from './Graph';
import Table from './Table';
import Loading from '../../../components/Loading';

import DateHandler from '../../../utils/DateHandler';

import type Moment from 'moment';

type Props = {
  siteId: string,
  fetching: boolean,
  datasets: Object,
  fetchStatistics: Object => void,
};

type State = {
  startDate: ?Moment,
  endDate: ?Moment,
  focusedInput: ?string,
  dateRanges: Array<{ id: string, name: string, selected: boolean }>,
};

class Statistics extends Component<Props, State> {
  state = {
    startDate: DateHandler.initialDate().previousWeek,
    endDate: DateHandler.initialDate().toDay,
    focusedInput: null,
    dateRanges: [
      { id: 'today', name: '오늘', selected: false }, // 오늘(시간)
      { id: 'day', name: '일간', selected: true }, // 7일
      { id: 'week', name: '주간', selected: false }, // 7주
      { id: 'month', name: '월간', selected: false }, // 7달
    ],
  };

  componentDidMount = () => {
    const { startDate, endDate } = this.state;
    const { fetchStatistics, siteId } = this.props;
    const date = DateHandler.getDate(startDate, endDate);

    fetchStatistics({ siteId, start: date.start, end: date.end });
  };

  changeRange = (id: string) => () => {
    this.setState(prevState => ({
      dateRanges: prevState.dateRanges.map(element => {
        if (element.id === id) {
          return { ...element, selected: true };
        }
        return { ...element, selected: false };
      }),
    }));
  };

  onDatesChange = ({ startDate, endDate }: State): void => {
    const { fetchStatistics, siteId } = this.props;
    const date = DateHandler.getDate(startDate, endDate);

    this.setState({ startDate, endDate });
    fetchStatistics({ siteId, start: date.start, end: date.end });
  };

  onFocusChange = (focusedInput: string) => this.setState({ focusedInput });

  onPressPickerButton = () => this.setState(prevState => ({ focusedInput: 'startDate' }));

  render() {
    const { dateRanges, startDate, endDate, focusedInput } = this.state;
    const { fetching, datasets } = this.props;

    return (
      <div className="statistics-container">
        {fetching ? <Loading /> : null}
        <div className="date-range-wrapper">
          {dateRanges.map(({ id, name, selected }, i) => (
            <div key={i} className={cx('picker-box', { selected })} onClick={this.changeRange(id)}>
              {name}
            </div>
          ))}
        </div>
        <DatePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          onPressPickerButton={this.onPressPickerButton}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
        />
        <Graph data={datasets} />
        <Table />
      </div>
    );
  }
}

export default connect(
  state => ({
    siteId: state.getIn(['auth', 'siteId']),
    fetching: state.getIn(['ceo', 'status', 'isFetching']),
    datasets: state.getIn(['ceo', 'statistics']),
  }),
  dispatch => ({
    fetchStatistics: payload => dispatch(fetchStatistics(payload)),
  })
)(Statistics);
