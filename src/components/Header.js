// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

type Props = {
  loggin?: boolean,
  title: string,
  routes: {
    hash: string,
    pathname: string,
    search: string,
  },
  // TODO: implement...
  history: Object,
};

const ButtonOpenSideMenu = () => {
  return (
    <div className="mainMenu">
      <div className="line l1" />
      <div className="line l2" />
      <div className="line l3" />
    </div>
  );
};

const TabMenu = ({ path, handleRoutes }) => (
  <div className="tabmenu item3">
    <ul>
      <li className={cx({ active: path === '/order/reception' ? true : false })}>
        <div onClick={handleRoutes('/order/reception')}>
          주문접수<span className="count">12</span>
        </div>
      </li>
      <li className={cx({ active: path === '/order/progress' ? true : false })}>
        <div onClick={handleRoutes('/order/progress')}>
          처리중<span className="count">4</span>
        </div>
      </li>
      <li className={cx({ active: path === '/order/complete' ? true : false })}>
        <div onClick={handleRoutes('/order/complete')}>처리완료</div>
      </li>
    </ul>
  </div>
);

class Header extends Component<Props> {
  handleRoutes = (go: string) => () => {
    this.props.history.push(go);
  };

  render() {
    const { loggin, title, routes } = this.props;

    return (
      <div className="header">
        {!loggin && <ButtonOpenSideMenu />}
        <div className="title">{title}</div>
        {!loggin && <TabMenu handleRoutes={this.handleRoutes} path={routes.pathname} />}
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    routes: state.get('routes'),
  }))(Header)
);
