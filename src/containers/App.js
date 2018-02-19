import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initSignin } from '../actions/auth';
import { closePopup } from '../actions/ui';

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
import getClassNameByRoutes from '../utils/getClassNameByRoutes';

class App extends Component {
  componentDidMount = () => {
    document.addEventListener('message', this.onMessage);
    // FIXME:
    this.props.initSignin({ id: 'tiba', pw: 'test1234' });
  };

  componentWillUnmount = () => {
    document.removeEventListener('message', this.onMessage);
  };

  /**
   * TODO: 모바일앱에서 local message받으면 postmessage가 push/RECEIVE_MESSAGE 이런 형태로 구현해야함
   * 그럼 fromMobile(msg.payload)로 액션 발생하고
   * reducer에서 해당 메세지 받으면... 아마도 ui가 팝업 되어야 함
   */
  onMessage = event => {
    const { locationChange, fromMobile, session, siteId, initFetchOrderLists } = this.props;
    const msg = JSON.parse(event.data);

    if (msg.type === '@@router/LOCATION_CHANGE') {
      locationChange(msg.payload.route);
    } else if (msg.type === 'firebase/MESSAGE_RECEIVED') {
      initFetchOrderLists({ session, siteId });
    } else {
      fromMobile(msg.payload);
    }
  };

  render() {
    const { sideMenu, status, router } = this.props;
    const routes = getClassNameByRoutes(router.location, status);

    return (
      <PopupController>
        <div className={routes.classname}>
          <Header customProps={routes} />
          {sideMenu ? (
            <div id="sidemenu-overlay" onClick={() => this.props.closePopup('sideMenu')} />
          ) : null}
          <SideMenu open={sideMenu} />
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
      status: state.getIn(['order', 'detail', 'order', 'status']),
      session: state.getIn(['auth', 'session']),
      siteId: state.getIn(['auth', 'siteId']),
    }),
    dispatch => ({
      closePopup: ui => dispatch(closePopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
      fromMobile: action => dispatch(action),
      initSignin: user => dispatch(initSignin(user)),
      initFetchOrderLists: payload => dispatch(initFetchOrderLists(payload)),
    })
  )(App)
);
