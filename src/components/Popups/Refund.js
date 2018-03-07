import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';
import { initSetOrderProcess } from '../../actions/order';

class Refund extends Component {
  _onPress = () => {
    const { closePopup } = this.props;

    closePopup('refund');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper refund">
            <img src="/img/refund.svg" style={{ width: '65px' }} />
            <div className="popup-text-wrapper">
              <p className="popup-text order-process">고객님께 주문금액은</p>
              <p className="popup-text">
                <span style={{ color: '#fe931f' }}>환불</span>되었습니까?
              </p>
            </div>
          </div>
          <div className="popup-btn-wrapper">
            <div className="popup-btn" onClick={this._onPress}>
              취소
            </div>
            <div className="popup-btn right" onClick={this._onPress}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
}))(Refund);
