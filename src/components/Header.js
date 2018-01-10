// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import cx from 'classnames';

type Props = {
  loggin?: boolean,
  title: string,
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

const TabMenu = ({ route }) => (
  <div className="tabmenu item3">
    <ul>
      <li className="active">
        <Link to="/order/reception">
          주문접수<span className="count">12</span>
        </Link>
      </li>
      <li>
        <Link to="/order/progress">
          처리중<span className="count">4</span>
        </Link>
      </li>
      <li>
        <Link to="/order/complete">처리완료</Link>
      </li>
    </ul>
  </div>
);

class Header extends Component<Props> {
  handleRoutes = (go: string) => {
    // /order/reception
    // /order/progress
    // /order/complete
  };

  getActiveClassName = (type: string) => {};

  render() {
    const { loggin, title } = this.props;

    return (
      <div className="header">
        {!loggin && <ButtonOpenSideMenu />}
        <div className="title">{title}</div>
        {!loggin && <TabMenu />}
      </div>
    );
  }
}

export default connect(state => ({
  routes: state.get('routes'),
}))(Header);
