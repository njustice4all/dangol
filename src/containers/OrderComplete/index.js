import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ItemDelivery, ItemTable, ItemPackage, Loading, EmptyOrder } from '../../components';

import { initFetchProcessDone, fetchOrderMore } from '../../actions/order';

class OrderComplete extends Component {
  componentDidMount = () => {
    const { initFetchProcessDone, session, siteId } = this.props;
    if (session) {
      initFetchProcessDone({ session, siteId });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initFetchProcessDone } = this.props;

    if (nextProps.session !== this.props.session) {
      const { session, siteId } = nextProps;
      initFetchProcessDone({ session, siteId });
    }
  };

  goDetail = no => () => {
    this.props.locationChange(`/order/complete/${no}`);
  };

  _onScroll = () => {
    const { fetchOrderMore, siteId, order } = this.props;
    const endPosition = this.scroll.scrollHeight - this.scroll.clientHeight;

    const type = ['deliveryDone', 'cancelDonePay', 'cancelDoneFree'];

    const currentPage = order.getIn(['doneListsObj', 'currentPage']);
    const maxPage = order.getIn(['doneListsObj', 'maxPage']);

    if (currentPage === maxPage) {
      return;
    }

    if (endPosition === this.scroll.scrollTop) {
      fetchOrderMore({ siteId, type, page: currentPage + 1 });
    }
  };

  render() {
    const { doneLists, coords, router, order, isFetching } = this.props;
    const pathname = router.location.pathname.split('/order/')[1];
    const height = window.innerHeight - 96;

    return (
      <div
        className="body"
        onScroll={this._onScroll}
        ref={scroll => (this.scroll = scroll)}
        style={{ height }}>
        {isFetching ? <Loading /> : null}
        {order.get('doneLists').size === 0 ? <EmptyOrder title="완료된 주문" /> : null}
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
    isFetching: state.getIn(['order', 'isFetching']),
  }),
  dispatch => ({
    initFetchProcessDone: payload => dispatch(initFetchProcessDone(payload)),
    locationChange: pathname => dispatch(push(pathname)),
    fetchOrderMore: payload => dispatch(fetchOrderMore(payload)),
  })
)(OrderComplete);
