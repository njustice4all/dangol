import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderLists } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

class OrderReception extends Component {
  componentDidMount = () => {
    this.props.initFetchOrderLists();
  };

  goDetail = no => () => {
    this.props.logout();
    // this.props.history.push('/');
    // this.props.history.push(`/order/reception/${no}`);
    this.props.locationChange(`/`);
  };

  render() {
    const { order, coords, router } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    return (
      <div className="body">
        <div className="bodyHeader">2017-12-22</div>
        <ul className="list-items">
          {order.lists.map((order, index) => {
            if (order.get('type') === 'delivery') {
              return (
                <ItemDelivery
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  shopCoords={coords}
                  pathname={pathname}
                />
              );
            } else if (order.get('type') === 'order') {
              return (
                <ItemTable
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  pathname={pathname}
                />
              );
            } else {
              return (
                <ItemPackage
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
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
  }),
  dispatch => ({
    initFetchOrderLists: () => dispatch(initFetchOrderLists()),
    logout: () => dispatch({ type: 'auth/LOGOUT' }),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(OrderReception);
