import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

import { initFetchProcessDone } from '../../actions/order';

class OrderComplete extends Component {
  componentDidMount = () => {
    const { initFetchProcessDone, session, siteId } = this.props;
    initFetchProcessDone({ session, siteId });
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/complete/${no}`);
  };

  render() {
    const { doneLists, coords, router, order } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    return (
      <div className="body">
        <div className="bodyHeader">2018-02-07</div>
        <ul className="list-items">
          {doneLists.map((order, index) => {
            if (order.get('type') === 'delivery') {
              return (
                <ItemDelivery
                  order={order}
                  key={`done-${index}`}
                  shopCoords={coords}
                  status={order.getIn(['data', 'stateCount'])}
                  goDetail={this.goDetail}
                  pathname={pathname}
                />
              );
            } else if (order.get('type') === 'order') {
              return (
                <ItemTable
                  order={order}
                  key={`done-${index}`}
                  status={order.getIn(['data', 'stateCount'])}
                  goDetail={this.goDetail}
                  pathname={pathname}
                />
              );
            } else {
              return (
                <ItemPackage
                  order={order}
                  key={`done-${index}`}
                  status={order.getIn(['data', 'stateCount'])}
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
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    initFetchProcessDone: payload => dispatch(initFetchProcessDone(payload)),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(OrderComplete);
