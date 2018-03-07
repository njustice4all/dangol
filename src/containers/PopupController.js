import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  OrderReject,
  DeliveryAccept,
  OrderComplete,
  OrderAccept,
  UserDel,
  NewOrder,
  Refund,
} from '../components/Popups';

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
    const { orderType } = this.props;

    if (type.reject) {
      return <OrderReject />;
    } else if (type.order) {
      return <DeliveryAccept />;
    } else if (type.orderComplete) {
      return <OrderComplete />;
    } else if (type.orderAccept) {
      return <OrderAccept />;
    } else if (type.deleteUser) {
      return <UserDel />;
    } else if (type.newOrder) {
      return <NewOrder orderType={orderType} />;
    } else if (type.refund) {
      return <Refund />;
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
  orderType: state.getIn(['ui', 'orderType']),
}))(PopupController);
