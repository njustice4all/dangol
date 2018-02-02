import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';

class OrderConfirm extends Component {
  _onPress = () => {
    const { closePopup, locationChange } = this.props;

    closePopup('orderAccept');
    locationChange('/order/progress');
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

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
  locationChange: pathname => dispatch(push(pathname)),
}))(OrderConfirm);
