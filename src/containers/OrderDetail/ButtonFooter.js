import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import { openPopup } from '../../actions/ui';

class ButtonFooter extends Component {
  _onPress = () => {
    const { type, openPopup, isProgress, locationChange } = this.props;
    console.log(type);
    if (type === 'order' || type === 'package') {
      if (isProgress) {
        // 처리완료
        openPopup('orderComplete');
      } else {
        // 처리중
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
      type: state.getIn(['order', 'detail', 'orderDetail', 'sub_state']),
    }),
    dispatch => ({
      openPopup: ui => dispatch(openPopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
    })
  )(ButtonFooter)
);
