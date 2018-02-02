import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

import { initFetchProcessDone, initFetchOrderLists } from '../../actions/order';

class OrderComplete extends Component {
  componentDidMount = () => {
    // this.props.initFetchProcessDone();
    this.props.initFetchOrderLists();
  };

  goDetail = no => () => {
    this.props.history.push(`/order/complete/${no}`);
  };

  render() {
    const { doneLists, coords, router, order } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    return (
      <div className="body">
        <div className="bodyHeader">2017-12-22</div>
        <ul className="list-items">
          {order.get('lists').map((order, index) => {
            if (order.get('type') === 'delivery') {
              return (
                <ItemDelivery
                  order={order}
                  key={`done-${index}`}
                  shopCoords={coords}
                  status={order.get('status')}
                  goDetail={this.goDetail}
                  pathname={pathname}
                />
              );
            } else if (order.get('type') === 'order') {
              return (
                <ItemTable
                  order={order}
                  key={`done-${index}`}
                  status={order.get('status')}
                  goDetail={this.goDetail}
                  pathname={pathname}
                />
              );
            } else {
              return (
                <ItemPackage
                  order={order}
                  key={`done-${index}`}
                  status={order.get('status')}
                  goDetail={this.goDetail}
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
    doneLists: state.getIn(['order', 'doneLists']),
    coords: state.getIn(['auth', 'coords']),
    router: state.get('router'),
  }),
  dispatch => ({
    initFetchProcessDone: () => dispatch(initFetchProcessDone()),
    initFetchOrderLists: () => dispatch(initFetchOrderLists()),
  })
)(OrderComplete);
