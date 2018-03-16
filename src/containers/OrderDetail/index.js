import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { initFetchOrderDetail } from '../../actions/order';
import { initGetCoords } from '../../actions/order';

import Products from './Products';
import Customer from './Customer';
import Order from './Order';
import ButtonFooter from './ButtonFooter';
import { Loading } from '../../components';

import getCoords from '../../utils/getCoords';
import getPayment from '../../utils/getPayment';

class OrderDetail extends Component {
  componentDidMount = () => {
    const { initFetchOrderDetail, match, session, siteId } = this.props;
    const no = match.params.no;

    initFetchOrderDetail({ session, siteId, no });
  };

  componentDidUpdate = prevProps => {
    try {
      const address =
        this.props.detail.getIn(['order', 'od_b_addr1']) +
        ' ' +
        this.props.detail.getIn(['order', 'od_b_addr2']);

      // if (prevProps.detail.get('order').size !== this.props.detail.get('order').size) {
      //   this.props.initGetCoords({ address });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      detail,
      shopCoords,
      isComplete,
      isProgress,
      isFetching,
      processLists,
      pathname,
    } = this.props;

    const no = detail.getIn(['order', 'order_no']);
    const type = getPayment(processLists, no);
    let donePayment = false;

    if (type === 'mobile' && isProgress) {
      donePayment = true;
    }

    if (isFetching) {
      return <Loading />;
    }

    const isReception = pathname.split('/').includes('reception');
    const height = window.innerHeight - (isReception ? 165 : 175);

    return (
      <div>
        <div className="body" style={{ height, overflow: 'scroll' }}>
          <Order detail={detail} />
          <Customer detail={detail} shopCoords={shopCoords} />
          <Products detail={detail} />
        </div>
        <ButtonFooter isComplete={isComplete} isProgress={isProgress} donePayment={donePayment} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lists: state.getIn(['order', 'lists']),
    processLists: state.getIn(['order', 'processLists']),
    detail: state.getIn(['order', 'detail']),
    shopCoords: state.getIn(['auth', 'coords']),
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
    isFetching: state.getIn(['order', 'isFetching']),
    pathname: state.get('router').location.pathname,
  }),
  dispatch => ({
    initFetchOrderDetail: payload => dispatch(initFetchOrderDetail(payload)),
    initGetCoords: address => dispatch(initGetCoords(address)),
  })
)(OrderDetail);
