import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closePopup } from '../../actions/ui';

class NewOrder extends Component {
  _onPress = () => {
    this.props.closePopup('newOrder');
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-image-wrapper">
            <img src="/img/newOrder.png" />
          </div>
          <div className="popup-btn-wrapper" onClick={this._onPress}>
            확인
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
}))(NewOrder);
