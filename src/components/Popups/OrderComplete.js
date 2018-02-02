import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';

class OrderComplete extends Component {
  _onPress = () => {
    const { closePopup, locationChange } = this.props;

    closePopup('orderComplete');
    locationChange('/order/complete');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-pannel order-time">
          <div className="header">
            <div className="title">주문완료</div>
          </div>
          <div className="body">고생하셨어요 사장님 손님에게 알릴게요</div>
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

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
  locationChange: pathname => dispatch(push(pathname)),
}))(OrderComplete);
