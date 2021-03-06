import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderLists, fetchOrderMore } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage, Loading, EmptyOrder } from '../../components';

class OrderReception extends Component {
  componentDidMount = () => {
    const { initFetchOrderLists, session, siteId } = this.props;
    if (session) {
      initFetchOrderLists({ session, siteId });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initFetchOrderLists } = this.props;

    if (nextProps.session !== this.props.session) {
      const { session, siteId } = nextProps;
      initFetchOrderLists({ session, siteId });
    }
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/reception/${no}`);
  };

  _onScroll = () => {
    const { fetchOrderMore, siteId, order } = this.props;
    const endPosition = this.scroll.scrollHeight - this.scroll.clientHeight;

    const type = 'payDone';

    const currentPage = order.getIn(['orderListsObj', 'currentPage']);
    const maxPage = order.getIn(['orderListsObj', 'maxPage']);

    if (currentPage === maxPage) {
      return;
    }

    if (endPosition === this.scroll.scrollTop) {
      fetchOrderMore({ siteId, type, page: currentPage + 1 });
    }
  };

  render() {
    const { order, coords, router, isFetching } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];
    const height = window.innerHeight - 96;

    return (
      <div
        className="body"
        onScroll={this._onScroll}
        ref={scroll => (this.scroll = scroll)}
        style={{ height }}>
        {isFetching ? <Loading /> : null}
        {order.get('lists').size === 0 ? <EmptyOrder title="접수된 주문" /> : null}
        <ul className="list-items">
          {order.get('lists').map((order, index) => {
            if (order.get('type') === 'order') {
              return (
                <ItemTable
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  pathname={pathname}
                  isReception
                />
              );
            } else if (order.get('type') === 'package') {
              return (
                <ItemPackage
                  goDetail={this.goDetail}
                  order={order}
                  key={`order-${index}`}
                  pathname={pathname}
                  isReception
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
                  isReception
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
    isFetching: state.getIn(['order', 'isFetching']),
  }),
  dispatch => ({
    initFetchOrderLists: payload => dispatch(initFetchOrderLists(payload)),
    locationChange: pathname => dispatch(push(pathname)),
    fetchOrderMore: payload => dispatch(fetchOrderMore(payload)),
  })
)(OrderReception);
