import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { closePopup } from '../actions/ui';

import { Header, SideMenu } from '../components';
import PopupController from './PopupController';
import Signin from './Signin/Signin';
import OrderReception from './OrderReception';
import OrderProgress from './OrderProgress';
import OrderComplete from './OrderComplete';
import OrderDetail from './OrderDetail';

import getClassNameByRoutes from '../utils/getClassNameByRoutes';

class App extends Component {
  componentWillReceiveProps = nextProps => {
    const { changeRoute, history, location } = this.props;
    if (location.pathname !== nextProps.location.pathname) {
      changeRoute(history.location);
    }
  };

  render() {
    const { sideMenu, status } = this.props;
    const routes = getClassNameByRoutes(this.props.routes, status);

    return (
      <PopupController>
        <div className={routes.classname}>
          <Header customProps={routes} />
          {sideMenu ? (
            <div id="sidemenu-overlay" onClick={() => this.props.closePopup('sideMenu')} />
          ) : null}
          <SideMenu open={sideMenu} />
          <Route exact path="/" component={Signin} />
          <Route exact path="/order/reception" component={OrderReception} />
          <Route exact path="/order/reception/:no" component={OrderDetail} />
          <Route exact path="/order/progress" component={OrderProgress} />
          <Route exact path="/order/progress/:no" component={OrderProgress} />
          <Route exact path="/order/complete" component={OrderComplete} />
          <Route exact path="/order/complete/:no" component={OrderDetail} />
        </div>
      </PopupController>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      routes: state.get('routes'),
      sideMenu: state.getIn(['ui', 'sideMenu']),
      status: state.getIn(['order', 'detail', 'order', 'status']),
    }),
    dispatch => ({
      changeRoute: location => dispatch({ type: 'CHANGE_ROUTES', location }),
      closePopup: ui => dispatch(closePopup(ui)),
    })
  )(App)
);
