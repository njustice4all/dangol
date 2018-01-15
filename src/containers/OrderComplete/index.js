import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

import { initFetchProcessDone } from '../../actions/order';

class OrderComplete extends Component {
  componentDidMount = () => {
    this.props.initFetchProcessDone();
  };

  render() {
    const { doneLists, coords } = this.props;

    return (
      <div className="body">
        <div className="bodyHeader">2017-12-22</div>
        <ul className="list-items">
          {doneLists.map((order, index) => {
            if (order.get('type') === 'delivery') {
              return (
                <ItemDelivery
                  order={order}
                  key={`done-${index}`}
                  shopCoords={coords}
                  status={order.get('status')}
                  goDetail={hey => null}
                />
              );
            } else if (order.get('type') === 'order') {
              return (
                <ItemTable
                  order={order}
                  key={`done-${index}`}
                  status={order.get('status')}
                  goDetail={hey => null}
                />
              );
            } else {
              return (
                <ItemPackage
                  order={order}
                  key={`done-${index}`}
                  status={order.get('status')}
                  goDetail={hey => null}
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
    doneLists: state.getIn(['order', 'doneLists']),
    coords: state.getIn(['auth', 'coords']),
  }),
  dispatch => ({
    initFetchProcessDone: () => dispatch(initFetchProcessDone()),
  })
)(OrderComplete);
