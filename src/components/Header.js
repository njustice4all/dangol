// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

type Props = {
  loggin?: boolean,
  detail?: boolean,
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

const ButtonBack = ({ goBack }) => {
  return <div className="btn back" onClick={goBack} />;
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

const OrderType = ({ type }) => {
  let title: string = '매장';
  if (type === 'delivery') {
    title = '배달';
  } else if (type === 'package') {
    title = '포장';
  }

  return (
    <div className={cx('order-title', type)}>
      <span className="title">{title}</span>
      <span className="date">09:30</span>
    </div>
  );
};

class Header extends Component<Props> {
  handleRoutes = (go: string) => () => {
    this.props.history.push(go);
  };

  _goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { loggin, detail, title, routes } = this.props;

    return (
      <div className="header">
        {loggin && <ButtonOpenSideMenu />}
        {detail && <ButtonBack goBack={this._goBack} />}
        <div className="title">{title}</div>
        {detail && <OrderType type={'delivery'} />}
        {loggin && <TabMenu handleRoutes={this.handleRoutes} path={routes.pathname} />}
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    routes: state.get('routes'),
  }))(Header)
);
