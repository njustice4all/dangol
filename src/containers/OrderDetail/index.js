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
    const { initFetchOrderDetail, lists, match } = this.props;
    const no = match.params.no;
    initFetchOrderDetail(no);
  };

  render() {
    const { detail, shopCoords, isComplete, isProgress } = this.props;

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
  }),
  dispatch => ({
    initFetchOrderDetail: no => dispatch(initFetchOrderDetail(no)),
  })
)(OrderDetail);
