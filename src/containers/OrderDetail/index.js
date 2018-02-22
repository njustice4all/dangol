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

class OrderDetail extends Component {
  componentDidMount = () => {
    const { initFetchOrderDetail, lists, match, session, siteId } = this.props;
    const no = match.params.no;

    initFetchOrderDetail({ session, siteId, no });
  };

  componentDidUpdate = prevProps => {
    try {
      const address =
        this.props.detail.getIn(['order', 'od_b_addr1']) +
        ' ' +
        this.props.detail.getIn(['order', 'od_b_addr2']);

      if (prevProps.detail.get('order').size !== this.props.detail.get('order').size) {
        this.props.initGetCoords({ address });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { detail, shopCoords, isComplete, isProgress, isFetching } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="body">
        <Order detail={detail} />
        <Customer detail={detail} shopCoords={shopCoords} />
        <Products detail={detail} />
        <ButtonFooter isComplete={isComplete} isProgress={isProgress} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lists: state.getIn(['order', 'lists']),
    detail: state.getIn(['order', 'detail']),
    shopCoords: state.getIn(['auth', 'coords']),
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
    isFetching: state.getIn(['order', 'isFetching']),
  }),
  dispatch => ({
    initFetchOrderDetail: payload => dispatch(initFetchOrderDetail(payload)),
    initGetCoords: address => dispatch(initGetCoords(address)),
  })
)(OrderDetail);
