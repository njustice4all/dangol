import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initSignin } from '../actions/auth';
import { closePopup, openPopup } from '../actions/ui';

import { Header, SideMenu } from '../components';
import PopupController from './PopupController';
import Signin from './Signin';
import OrderReception from './OrderReception';
import OrderProgress from './OrderProgress';
import OrderComplete from './OrderComplete';
import OrderDetail from './OrderDetail';
import ModifyShop from './CEO/ModifyShop';
import ModifyProducts from './CEO/ModifyProducts';
import Terms from './Terms';
import { StopDelivery, Setting, Management, ManagementAdd, EditAdmin } from './Menus';

import { initFetchOrderLists } from '../actions/order';
import { initGetShopInfo } from '../actions/ceo';
import getClassNameByRoutes from '../utils/getClassNameByRoutes';
import getPayment from '../utils/getPayment';

class App extends Component {
  componentDidMount = () => {
    document.addEventListener('message', this.onMessage);

    const { locationChange, initSignin, location: { search } } = this.props;
    const params = new URLSearchParams(search);
    if (params.get('siteId')) {
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        initSignin({ id: user.id, pw: user.pw, autoLogin: user.autoLogin }).then(value => {
          if (value.redirect) {
            if (value.role === 'manager' || value.role === 'reseller') {
              locationChange(`/menus/management/${id}`);
            } else {
              locationChange('/menus/admin');
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('message', this.onMessage);
  };

  onMessage = event => {
    const {
      locationChange,
      fromMobile,
      session,
      siteId,
      initFetchOrderLists,
      openPopup,
      history,
      initGetShopInfo,
    } = this.props;
    const msg = JSON.parse(event.data);

    if (msg.type === '@@router/LOCATION_CHANGE') {
      locationChange(msg.payload.route);
    } else if (msg.type === 'firebase/MESSAGE_RECEIVED') {
      initFetchOrderLists({ session, siteId });
      openPopup('newOrder', null, msg.order);
    } else if (msg.type === '@@router/GO_BACK') {
      history.goBack();
    } else if (msg.type === 'web/GET_MEMBERS') {
      initGetShopInfo({ siteId: msg.payload });
    } else {
      fromMobile(msg.payload);
    }
  };

  render() {
    const { sideMenu, status, router, siteId, auth, detail, processLists } = this.props;

    const no = detail.getIn(['order', 'order_no']);
    const payment = getPayment(processLists, no);
    const routes = getClassNameByRoutes(router.location, status, payment);
    const pathname = router.location.pathname;

    const hideHeader =
      pathname === '/ceo/shop' ||
      pathname === '/ceo/products' ||
      pathname === '/' ||
      pathname.split('/').includes('terms');

    return (
      <PopupController>
        <div className={routes.classname} style={{ height: '100%' }}>
          {hideHeader ? null : <Header customProps={routes} />}
          {sideMenu ? (
            <div id="sidemenu-overlay" onClick={() => this.props.closePopup('sideMenu')} />
          ) : null}
          {pathname === '/' ? null : <SideMenu open={sideMenu} siteId={siteId} auth={auth} />}
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/order/reception" component={OrderReception} />
            <Route exact path="/order/reception/:no" component={OrderDetail} />
            <Route exact path="/order/progress" component={OrderProgress} />
            <Route
              exact
              path="/order/progress/:no"
              render={props => <OrderDetail {...props} isProgress />}
            />
            <Route exact path="/order/complete" component={OrderComplete} />
            <Route
              exact
              path="/order/complete/:no"
              render={props => <OrderDetail {...props} isComplete />}
            />
            <Route exact path="/menus/delivery" component={StopDelivery} />
            <Route exact path="/menus/setting" component={Setting} />
            <Route exact path="/menus/management" component={Management} />
            <Route exact path="/menus/management/add" component={ManagementAdd} />
            <Route
              exact
              path="/menus/management/addReseller"
              render={props => <ManagementAdd {...props} reseller />}
            />
            <Route
              exact
              path="/menus/management/:member"
              render={props => <ManagementAdd {...props} edit />}
            />
            <Route exact path="/menus/admin" component={EditAdmin} />
            <Route exact path="/ceo/shop" component={ModifyShop} />
            <Route exact path="/ceo/products" component={ModifyProducts} />
            <Route path="/ceo/terms/:options" component={Terms} />
          </Switch>
        </div>
      </PopupController>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      router: state.get('router'),
      sideMenu: state.getIn(['ui', 'sideMenu']),
      status: state.getIn(['order', 'detail', 'orderDetail', 'state']),
      session: state.getIn(['auth', 'session']),
      siteId: state.getIn(['auth', 'siteId']),
      auth: state.get('auth'),
      detail: state.getIn(['order', 'detail']),
      processLists: state.getIn(['order', 'processLists']),
      login: state.getIn(['auth', 'status', 'login']),
    }),
    dispatch => ({
      closePopup: ui => dispatch(closePopup(ui)),
      openPopup: ui => dispatch(openPopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
      fromMobile: action => dispatch(action),
      initSignin: user => dispatch(initSignin(user)),
      initFetchOrderLists: payload => dispatch(initFetchOrderLists(payload)),
      initialize: info => dispatch({ type: 'app/INITIALIZE', info }),
      initGetShopInfo: payload => dispatch(initGetShopInfo(payload)),
    })
  )(App)
);
