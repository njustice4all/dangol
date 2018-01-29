import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { closePopup } from '../actions/ui';

import { Header, SideMenu } from '../components';
import PopupController from './PopupController';
import Signin from './Signin';
import OrderReception from './OrderReception';
import OrderProgress from './OrderProgress';
import OrderComplete from './OrderComplete';
import OrderDetail from './OrderDetail';
import ModifyShop from './ModifyShop';
import { StopDelivery, Setting, Management, ManagementAdd, EditAdmin } from './Menus';

import getClassNameByRoutes from '../utils/getClassNameByRoutes';

class App extends Component {
  componentDidMount = () => {
    document.addEventListener('message', this.onMessage);
  };

  componentWillUnmount = () => {
    document.removeEventListener('message', this.onMessage);
  };

  onMessage = event => {
    const { locationChange, fromMobile } = this.props;
    const msg = JSON.parse(event.data);

    if (msg.type === '@@router/LOCATION_CHANGE') {
      locationChange(msg.payload.route);
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
          {/*{sideMenu ? (
            <div id="sidemenu-overlay" onClick={() => this.props.closePopup('sideMenu')} />
          ) : null}
        <SideMenu open={sideMenu} />*/}
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/order/reception" component={OrderReception} />
            <Route exact path="/order/reception/:no" component={OrderDetail} />
            <Route exact path="/order/progress" component={OrderProgress} />
            <Route exact path="/order/progress/:no" component={OrderProgress} />
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
    }),
    dispatch => ({
      closePopup: ui => dispatch(closePopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
      fromMobile: action => dispatch(action),
    })
  )(App)
);
