import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../../actions/ui';

class Logout extends Component {
  _onPress = () => {
    const { closePopup, logout, navigateTo } = this.props;
    // logout();
    closePopup('logout');
    // navigateTo('/');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper order-process" style={{ minHeight: '229px' }}>
            <div className="popup-text-wrapper">
              <p className="popup-text order-process" style={{ fontSize: '24px' }}>
                다른기기에서
              </p>
              <p className="popup-text order-process" style={{ fontSize: '24px' }}>
                <span className="popup-text-highlight accept">로그인</span>되었습니다.
              </p>
              <p className="popup-text" style={{ marginTop: '10px' }}>
                확인해주세요
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

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
  logout: () => dispatch({ type: 'auth/LOGOUT' }),
  navigateTo: route => dispatch(push(route)),
}))(Logout);
