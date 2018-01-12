import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, SideMenu } from '../components';
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
    const routes = getClassNameByRoutes(this.props.routes);

    return (
      <div className={routes.classname}>
        <Header title={routes.title} login={routes.buttonOpenSideMenu} detail={routes.detail} />
        <SideMenu />
        <Route exact path="/" component={Signin} />
        <Route exact path="/order/reception" component={OrderReception} />
        <Route exact path="/order/progress" component={OrderProgress} />
        <Route exact path="/order/complete" component={OrderComplete} />
        <Route exact path="/order/detail/:no" component={OrderDetail} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      routes: state.get('routes'),
    }),
    dispatch => ({
      changeRoute: location => dispatch({ type: 'CHANGE_ROUTES', location }),
    })
  )(App)
);
