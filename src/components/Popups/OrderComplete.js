import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';
import { initSetOrderComplete } from '../../actions/order';

class OrderComplete extends Component {
  _onPress = () => {
    const {
      closePopup,
      locationChange,
      lists,
      currentIdx,
      initSetOrderComplete,
      sessionId,
      siteId,
      orderNo,
    } = this.props;
    const results = [];

    const index = lists.findIndex(list => list.getIn(['data', 'idx']) === currentIdx + '');
    lists.getIn([index, 'data', 'product']).forEach(product => results.push(product.get('idx')));

    closePopup('orderComplete');
    initSetOrderComplete({ results, sessionId, siteId, orderNo });
    locationChange('/order/complete');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper" style={{ backgroundColor: 'white' }}>
          <div className="popup-image-wrapper">
            <img src="/img/complete.png" />
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
    lists: state.getIn(['order', 'processLists']),
    currentIdx: state.getIn(['order', 'detail', 'order', 'idx']),
    sessionId: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
    orderNo: state.getIn(['order', 'detail', 'order', 'order_no']),
  }),
  dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
    locationChange: pathname => dispatch(push(pathname)),
    initSetOrderComplete: payload => dispatch(initSetOrderComplete(payload)),
  })
)(OrderComplete);
