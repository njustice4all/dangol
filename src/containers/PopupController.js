import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OrderReject, OrderAccept, OrderComplete, OrderConfirm } from '../components/Popups';

class PopupController extends Component {
  // prevent scroll when pop up
  componentWillReceiveProps = nextProps => {
    if (nextProps.ui.get('isPop')) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  };

  _renderPopup = type => {
    if (type.reject) {
      return <OrderReject />;
    } else if (type.order) {
      return <OrderAccept />;
    } else if (type.orderComplete) {
      return <OrderComplete />;
    } else if (type.orderAccept) {
      return <OrderConfirm />;
    }
  };

  render() {
    const ui = this.props.ui.toJS();

    return (
      <div>
        {this._renderPopup(ui)}
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({
  ui: state.get('ui'),
}))(PopupController);
