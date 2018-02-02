import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openPopup } from '../../actions/ui';

class ButtonFooter extends Component {
  _onPress = () => {
    const { type, openPopup } = this.props;
    // if (type === '매장주문' || '포장주문') {
    //   console.log('hi');
    // } else {
    //   openPopup('order');
    // }
    openPopup('order');
  };

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
        <div className="btn big" onClick={this._onPress}>
          주문접수
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    type: state.getIn(['order', 'detail', 'order', 'order_state']),
  }),
  dispatch => ({
    openPopup: ui => dispatch(openPopup(ui)),
  })
)(ButtonFooter);
