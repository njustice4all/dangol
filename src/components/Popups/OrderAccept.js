import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import { closePopup } from '../../actions/ui';
import { setStatus, batchActions, initSetDeliveryProcess } from '../../actions/order';

class OrderAccept extends Component {
  state = {
    options: [
      { id: 30, name: '30분', selected: false },
      { id: 40, name: '40분', selected: false },
      { id: 50, name: '50분', selected: false },
      { id: 60, name: '60분', selected: false },
      { id: 70, name: '70분', selected: false },
      { id: 80, name: '80분', selected: false },
    ],
    error: false,
    time: new Date().toLocaleTimeString(),
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState(prevState => ({ time: new Date().toLocaleTimeString() }));
    }, 1000);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.error !== this.state.error) {
      this.time = setTimeout(() => {
        this.setState(prevState => ({ error: false }));
      }, 500);
    }
  };

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval);
    } else if (this.time) {
      clearTimeout(this.time);
    }
  };

  setOptionById = id => () => {
    this.setState(prevState => ({
      options: prevState.options.map(option => {
        if (option.id === id) {
          return { ...option, selected: true };
        }

        return { ...option, selected: false };
      }),
    }));
  };

  onCancelButtonPress = () => this.props.closePopup('order');

  onAcceptButtonPress = () => {
    const { options } = this.state;
    const { batchActions, setStatus, closePopup, history } = this.props;

    const result = options.filter(option => option.selected);

    if (result.length > 0) {
      const payloads = { status: 'accept', option: result[0].id };
      batchActions(setStatus(payloads), closePopup('order'));
      history.push('/order/progress');
    } else {
      this.setState(prevState => ({ error: true }));
    }
  };

  _setProcess = () => {
    console.log('처리중으로...');
  };

  _setComplete = () => {
    console.log('처리완료...');
  };

  render() {
    const { options, error, time } = this.state;

    return (
      <div className="popup-container">
        <div className={cx('popup-pannel order-time', { 'error-shake': error })}>
          <div className="header">
            <div className="title">배달 예상 소요시간</div>
            <div className="date">현재 시간 {time}</div>
          </div>
          <div className="body">
            <ul className="list-items">
              {options.map((option, index) => (
                <li
                  className={cx('list-item', { active: option.selected })}
                  onClick={this.setOptionById(option.id)}
                  key={`option-${index}`}>
                  <i className="icon clock" />
                  <div className="title">{option.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-wrapper">
            <div className="btn small" onClick={this.onCancelButtonPress}>
              취소
            </div>
            <div className="btn big" onClick={this.onAcceptButtonPress}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      lists: state.getIn(['order', 'lists']),
      currentIdx: state.getIn(['order', 'detail', 'order', 'idx']),
      orderNo: state.getIn(['order', 'detail', 'order', 'order_no']),
      sessionId: state.getIn(['auth', 'session']),
      siteId: state.getIn(['auth', 'siteId']),
    }),
    dispatch => ({
      closePopup: ui => dispatch(closePopup(ui)),
      setStatus: status => dispatch(setStatus(status)),
      batchActions: (first, second) => dispatch(batchActions(first, second)),
      initSetDeliveryProcess: payload => dispatch(initSetDeliveryProcess(payload)),
    })
  )(OrderAccept)
);
