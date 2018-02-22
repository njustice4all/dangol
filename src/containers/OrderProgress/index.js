import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderProcess } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage } from '../../components';

class OrderProgress extends Component {
  componentDidMount = () => {
    const { initFetchOrderProcess, session, siteId } = this.props;
    if (session) {
      initFetchOrderProcess({ session, siteId });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initFetchOrderProcess } = this.props;

    if (nextProps.session !== this.props.session) {
      const { session, siteId } = nextProps;
      initFetchOrderProcess({ session, siteId });
    }
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/progress/${no}`);
  };

  render() {
    const { order, coords, router, lists } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];

    return (
      <div className="body">
        {/*<div className="bodyHeader">2018-02-07</div>*/}
        <ul className="list-items">
          {lists.map((order, index) => {
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
    lists: state.getIn(['order', 'processLists']),
    coords: state.getIn(['auth', 'coords']),
    router: state.get('router'),
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    initFetchOrderProcess: payload => dispatch(initFetchOrderProcess(payload)),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(OrderProgress);
