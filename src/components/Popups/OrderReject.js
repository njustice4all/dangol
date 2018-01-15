import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import { closePopup } from '../../actions/ui';
import { setStatus, batchActions } from '../../actions/order';

class OrderReject extends Component {
  state = {
    options: [
      { id: 'noResources', selected: false, name: '재료부족', classNames: 'food' },
      { id: 'private', selected: false, name: '업소사정', classNames: 'shop' },
      { id: 'tooFar', selected: false, name: '배달불가지역', classNames: 'mark' },
      { id: 'busy', selected: false, name: '주문량폭주', classNames: 'alarm' },
    ],
    error: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.error !== this.state.error) {
      this.time = setTimeout(() => {
        this.setState(prevState => ({ error: false }));
      }, 500);
    }
  };

  componentWillUnmount = () => clearTimeout(this.time);

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

  onCancelButtonPress = () => this.props.closePopup('reject');

  onRejectAcceptButtonPress = () => {
    const { options } = this.state;
    const { batchActions, setStatus, closePopup, history } = this.props;

    const result = options.filter(option => option.selected);

    if (result.length > 0) {
      const payloads = { status: 'reject', option: result[0].id };
      batchActions(setStatus(payloads), closePopup('reject'));
      history.push('/order/complete');
    } else {
      this.setState(prevState => ({ error: true }));
    }
  };

  render() {
    const { options, error } = this.state;

    return (
      <div className="popup-container">
        <div className={cx('popup-pannel order-cancel', { 'error-shake': error })}>
          <div className="header">
            <div className="title">취소사유</div>
          </div>
          <div className="body">
            <ul className="list-items">
              {options.map((option, index) => (
                <li
                  className={cx('list-item', { active: option.selected })}
                  onClick={this.setOptionById(option.id)}
                  key={`option-${index}`}>
                  <i className={`icon ${option.classNames}`} />
                  <div className="title">{option.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-wrapper">
            <div className="btn small" onClick={this.onCancelButtonPress}>
              취소
            </div>
            <div className="btn big" onClick={this.onRejectAcceptButtonPress}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(null, dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
    setStatus: status => dispatch(setStatus(status)),
    batchActions: (first, second) => dispatch(batchActions(first, second)),
  }))(OrderReject)
);
