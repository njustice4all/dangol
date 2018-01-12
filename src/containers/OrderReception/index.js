import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initFetchOrderLists } from '../../actions/order';

import ItemDelivery from './ItemDelivery';
import ItemTable from './ItemTable';
import ItemPackage from './ItemPackage';

class OrderReception extends Component {
  componentDidMount = () => {
    this.props.initFetchOrderLists();
  };

  goDetail = no => () => {
    this.props.history.push(`/order/detail/${no}`);
  };

  render() {
    const { order, coords } = this.props;

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
                />
              );
            } else if (order.get('type') === 'order') {
              return <ItemTable goDetail={this.goDetail} order={order} key={`order-${index}`} />;
            } else {
              return <ItemPackage goDetail={this.goDetail} order={order} key={`order-${index}`} />;
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
  }),
  dispatch => ({
    initFetchOrderLists: () => dispatch(initFetchOrderLists()),
  })
)(OrderReception);
