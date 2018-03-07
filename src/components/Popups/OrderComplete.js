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
        <div className="popup-wrapper">
          <div className="popup-image-wrapper order-process">
            <img src="/img/complete.svg" style={{ width: '65px' }} />
            <div className="popup-text-wrapper">
              <p className="popup-text order-process">
                주문이 <span className="popup-text-highlight accept">완료처리</span>
              </p>
              <p className="popup-text" style={{ marginTop: '10px' }}>
                되었습니다.
              </p>
            </div>
          </div>
          <div className="popup-btn-wrapper">
            <div className="popup-btn-solo" onClick={this._onPress}>
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
