import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initFetchOrderDetail } from '../../actions/order';

import Products from './Products';
import Customer from './Customer';
import Order from './Order';
import ButtonFooter from './ButtonFooter';

import getCoords from '../../utils/getCoords';

class OrderDetail extends Component {
  componentDidMount = () => {
    const { initFetchOrderDetail, match } = this.props;
    initFetchOrderDetail(match.params.no);
  };

  render() {
    const { detail, shopCoords } = this.props;

    return (
      <div className="body">
        <Order detail={detail} />
        <Customer detail={detail} shopCoords={shopCoords} />
        <Products detail={detail} />
        <ButtonFooter />
      </div>
    );
  }
}

export default connect(
  state => ({
    detail: state.getIn(['order', 'detail']),
    shopCoords: state.getIn(['auth', 'coords']),
  }),
  dispatch => ({
    initFetchOrderDetail: no => dispatch(initFetchOrderDetail(no)),
  })
)(OrderDetail);
