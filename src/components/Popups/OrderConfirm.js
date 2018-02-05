import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';
import { initSetOrderProcess } from '../../actions/order';

class OrderConfirm extends Component {
  _onPress = () => {
    const {
      closePopup,
      locationChange,
      lists,
      currentIdx,
      initSetOrderProcess,
      sessionId,
      siteId,
    } = this.props;
    const results = [];

    const index = lists.findIndex(list => list.getIn(['data', 'idx']) === currentIdx + '');
    lists.getIn([index, 'data', 'product']).forEach(product => results.push(product.get('idx')));

    closePopup('orderAccept');
    initSetOrderProcess({ results, sessionId, siteId });
    locationChange('/order/progress');
  };

  _setProcess = () => {
    console.log('처리중으로...');
  };

  _setComplete = () => {
    console.log('처리완료...');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-pannel order-time">
          <div className="header">
            <div className="title">주문접수</div>
          </div>
          <div className="body">사장님 접수처리 되었습니다.</div>
          <div className="btn-wrapper">
            <div className="btn big" onClick={this._onPress}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    lists: state.getIn(['order', 'lists']),
    currentIdx: state.getIn(['order', 'detail', 'order', 'idx']),
    sessionId: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
    locationChange: pathname => dispatch(push(pathname)),
    initSetOrderProcess: payload => dispatch(initSetOrderProcess(payload)),
  })
)(OrderConfirm);
