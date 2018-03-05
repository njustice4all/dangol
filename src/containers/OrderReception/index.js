import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderLists, fetchOrderMore } from '../../actions/order';

import { ItemDelivery, ItemTable, ItemPackage, Loading } from '../../components';

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

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div
        className="body"
        style={{ height: 'calc(100% - 96px)', overflow: 'scroll' }}
        onScroll={this._onScroll}
        ref={scroll => (this.scroll = scroll)}>
        {/*<div className="bodyHeader">2018-02-07</div>*/}
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
