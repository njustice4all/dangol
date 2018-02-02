import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import { openPopup } from '../../actions/ui';

class ButtonFooter extends Component {
  _onPress = () => {
    const { type, openPopup, isProgress, locationChange } = this.props;
    if (type === '매장주문' || type === '포장주문') {
      if (isProgress) {
        openPopup('orderComplete');
      } else {
        openPopup('orderAccept');
      }
    } else {
      openPopup('order');
    }
  };

  render() {
    if (this.props.isComplete) {
      return (
        <div className="btn-wrapper">
          <div className="btn big" onClick={() => this.props.history.goBack()}>
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
        <div className="btn big" onClick={this._onPress}>
          주문접수
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      type: state.getIn(['order', 'detail', 'order', 'order_state']),
    }),
    dispatch => ({
      openPopup: ui => dispatch(openPopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
    })
  )(ButtonFooter)
);
