import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';
import { initSetOrderProcess } from '../../actions/order';

class OrderAccept extends Component {
  _onPress = () => {
    const {
      closePopup,
      locationChange,
      lists,
      currentIdx,
      initSetOrderProcess,
      sessionId,
      siteId,
      orderNo,
    } = this.props;
    const results = [];

    const index = lists.findIndex(list => list.getIn(['data', 'idx']) === currentIdx + '');
    lists.getIn([index, 'data', 'product']).forEach(product => results.push(product.get('idx')));

    closePopup('orderAccept');
    initSetOrderProcess({ results, sessionId, siteId, orderNo });
    locationChange('/order/progress');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper">
            <img src="/img/accept.png" />
          </div>
          <div className="popup-btn-wrapper" onClick={this._onPress}>
            확인
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
    orderNo: state.getIn(['order', 'detail', 'order', 'order_no']),
    sessionId: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
    locationChange: pathname => dispatch(push(pathname)),
    initSetOrderProcess: payload => dispatch(initSetOrderProcess(payload)),
  })
)(OrderAccept);
