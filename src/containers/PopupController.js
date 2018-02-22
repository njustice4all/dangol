import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OrderReject, DeliveryAccept, OrderComplete, OrderAccept } from '../components/Popups';

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
      return <DeliveryAccept />;
    } else if (type.orderComplete) {
      return <OrderComplete />;
    } else if (type.orderAccept) {
      return <OrderAccept />;
    }
  };

  render() {
    const ui = this.props.ui.toJS();

    return (
      <div style={{ height: '100%' }}>
        {this._renderPopup(ui)}
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({
  ui: state.get('ui'),
}))(PopupController);
