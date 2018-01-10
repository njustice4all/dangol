import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, SideMenu } from '../components';
import Signin from './Signin/Signin';
import OrderReception from './OrderReception';
import OrderProgress from './OrderProgress';
import OrderComplete from './OrderComplete';

import getClassNameByRoutes from '../utils/getClassNameByRoutes';

class App extends Component {
  componentWillReceiveProps = nextProps => {
    // FIXME: 선택실행 or redux router 방법 바꾸기
    const { changeRoute, history } = this.props;
    changeRoute(history.location);
  };

  render() {
    const routes = getClassNameByRoutes(this.props.routes);

    return (
      <div className={routes.classname}>
        <SideMenu />
        <Header title={routes.title} loggin={routes.buttonOpenSideMenu} />
        <Route exact path="/" component={Signin} />
        <Route exact path="/order/reception" component={OrderReception} />
        <Route exact path="/order/progress" component={OrderProgress} />
        <Route exact path="/order/complete" component={OrderComplete} />
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
