import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderLists } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

class OrderReception extends Component {
  componentDidMount = () => {
    const { initFetchOrderLists, session, siteId } = this.props;
    initFetchOrderLists({ session, siteId });
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/reception/${no}`);
  };

  render() {
    const { order, coords, router } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    // FIXME: 주문타입으로 분류
    return (
      <div className="body">
        <div className="bodyHeader">2018-02-07</div>
        <ul className="list-items">
          {order.get('lists').map((order, index) => {
            if (order.get('type') === 'order') {
              return (
                <ItemTable
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  pathname={pathname}
                />
              );
            } else if (order.get('type') === 'package') {
              return (
                <ItemPackage
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  pathname={pathname}
                />
              );
            } else {
              return (
                <ItemDelivery
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  shopCoords={coords}
                  pathname={pathname}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    order: state.get('order'),
    coords: state.getIn(['auth', 'coords']),
    router: state.get('router'),
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    initFetchOrderLists: payload => dispatch(initFetchOrderLists(payload)),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(OrderReception);
