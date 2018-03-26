import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initFetchOrderDetail } from '../../actions/order';
import { initGetCoords } from '../../actions/order';
import { openPopup } from '../../actions/ui';

import Products from './Products';
import Customer from './Customer';
import Order from './Order';
import ButtonFooter from './ButtonFooter';
import { Loading } from '../../components';

import getCoords from '../../utils/getCoords';
import getPayment from '../../utils/getPayment';

class OrderDetail extends Component {
  componentDidMount = () => {
    const { initFetchOrderDetail, match, session, siteId, lists, processLists } = this.props;
    const no = match.params.no;

    initFetchOrderDetail({ session, siteId, no });
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.detail.size !== nextProps.detail.size) {
      this.checkAuthentication(nextProps.detail);
    }
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

  checkAuthentication = detail => {
    const { lists, processLists, match, pathname, openPopup, logout, navigateTo } = this.props;
    const no = match.params.no;

    // 처리완료는 체크안해도됨
    if (pathname.split('/').includes('complete')) return;

    const getIndexByTarget = (target, no) => {
      return this.props[target].findIndex(list => list.getIn(['data', 'idx']) === no);
    };

    const listIndex = getIndexByTarget('lists', no);
    const processIndex = getIndexByTarget('processLists', no);

    const checkSameState = state => (element, index) => element.get('state') === state;

    let listStateIsSame = false;
    let resultStateIsSame = false;

    try {
      if (pathname.split('/').includes('reception')) {
        listStateIsSame = lists
          .getIn([listIndex, 'data', 'product'])
          .every(checkSameState('payDone'));
      } else {
        listStateIsSame = processLists
          .getIn([processIndex, 'data', 'product'])
          .every(checkSameState('deliveryPrepare'));
      }

      if (pathname.split('/').includes('reception') && listStateIsSame) {
        resultStateIsSame = detail.get('orderDetail').every(checkSameState('payDone'));
      } else {
        resultStateIsSame = detail.get('orderDetail').every(checkSameState('deliveryPrepare'));
      }

      if (!resultStateIsSame) {
        openPopup('logout');
        logout();
        navigateTo('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => this.props.resetDetail();

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
    resetDetail: () => dispatch({ type: 'order/RESET_DETAIL' }),
    openPopup: ui => dispatch(openPopup(ui)),
    logout: () => dispatch({ type: 'auth/LOGOUT' }),
    navigateTo: route => dispatch(push(route)),
  })
)(OrderDetail);
