import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closePopup } from '../../actions/ui';

class Fail extends Component {
  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper order-process" style={{ minHeight: '229px' }}>
            <div className="popup-text-wrapper">
              <p className="popup-text order-process">
                <span className="popup-text-highlight accept">입력폼</span>
              </p>
              <p className="popup-text" style={{ marginTop: '10px' }}>
                확인해주세요
              </p>
            </div>
          </div>
          <div className="popup-btn-wrapper">
            <div className="popup-btn-solo" onClick={() => this.props.closePopup('fail')}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({ closePopup: ui => dispatch(closePopup(ui)) }))(Fail);
