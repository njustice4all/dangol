import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { closePopup } from '../../actions/ui';

class NewOrder extends Component {
  _onPress = () => {
    this.props.closePopup('newOrder');
  };

  render() {
    const { orderType } = this.props;
    let name = '배달';
    if (orderType === 'package') {
      name = '포장';
    } else if (orderType === 'order') {
      name = '매장';
    }

    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper">
            <img src={`/img/${orderType}.svg`} />
            <div className="popup-text-wrapper">
              <p className="popup-text">
                <span className={`popup-text-highlight ${orderType}`}>{name}</span>
                <span>주문</span>이
              </p>
              <p className="popup-text" style={{ marginTop: '5px' }}>
                접수되었습니다.
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
}))(NewOrder);
