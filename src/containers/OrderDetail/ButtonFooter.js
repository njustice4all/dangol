import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openPopup } from '../../actions/ui';

class ButtonFooter extends Component {
  render() {
    if (this.props.isComplete) {
      return (
        <div className="btn-wrapper">
          <div className="btn big" onClick={() => console.log('hey')}>
            확인
          </div>
        </div>
      );
    }

    return (
      <div className="btn-wrapper">
        <div className="btn small" onClick={() => this.props.openPopup('reject')}>
          거부
        </div>
        <div className="btn big" onClick={() => this.props.openPopup('order')}>
          주문접수
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  openPopup: ui => dispatch(openPopup(ui)),
}))(ButtonFooter);
