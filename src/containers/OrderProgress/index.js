import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderLists, initFetchOrderProcess } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

class OrderProgress extends Component {
  componentDidMount = () => {
    this.props.initFetchOrderLists();
    // this.props.initFetchOrderProcess();
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/progress/${no}`);
  };

  render() {
    const { order, coords, router } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    // FIXME: 주문타입으로 분류
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
    initFetchOrderProcess: () => dispatch(initFetchOrderProcess()),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(OrderProgress);
