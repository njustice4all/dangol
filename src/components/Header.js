// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

import { openPopup } from '../actions/ui';

type Props = {
  login?: boolean,
  detail?: boolean,
  title: string,
  order: Object,
  routes: {
    hash: string,
    pathname: string,
    search: string,
  },
  history: Object,
  openPopup: string => void,
};

const ButtonOpenSideMenu = ({ openSideMenu }) => {
  return (
    <div className="mainMenu" onClick={openSideMenu}>
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

const OrderType = ({ type, date }) => {
  let title: string = '매장';
  if (type === 'delivery') {
    title = '배달';
  } else if (type === 'package') {
    title = '포장';
  }

  return (
    <div className={cx('order-title', type)}>
      <span className="title">{title}</span>
      <span className="date">{date.split(' ')[1]}</span>
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

  openSideMenu = () => {
    this.props.openPopup('sideMenu');
  };

  render() {
    const { login, detail, title, routes, order } = this.props;

    return (
      <div className="header">
        {login && <ButtonOpenSideMenu openSideMenu={this.openSideMenu} />}
        {detail && <ButtonBack goBack={this._goBack} />}
        <div className="title">{title}</div>
        {detail && <OrderType type={order.get('type')} date={order.get('date')} />}
        {login && <TabMenu handleRoutes={this.handleRoutes} path={routes.pathname} />}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      routes: state.get('routes'),
      order: state.getIn(['order', 'detail', 'order']),
    }),
    dispatch => ({
      openPopup: ui => dispatch(openPopup(ui)),
    })
  )(Header)
);
