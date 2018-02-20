// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cx from 'classnames';

import { openPopup } from '../actions/ui';

type Props = {
  customProps: Object,
  order: Object,
  router: Object,
  status: string,
  detail: Object,
  locationChange: string => void,
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
          주문접수{/*<span className="count">12</span>*/}
        </div>
      </li>
      <li className={cx({ active: path === '/order/progress' ? true : false })}>
        <div onClick={handleRoutes('/order/progress')}>
          처리중{/*<span className="count">4</span>*/}
        </div>
      </li>
      <li className={cx({ active: path === '/order/complete' ? true : false })}>
        <div onClick={handleRoutes('/order/complete')}>처리완료</div>
      </li>
    </ul>
  </div>
);

const OrderType = ({ type, date }) => {
  let title: string = '배달';
  let customType = 'delivery';

  if (type === 'package') {
    title = '포장';
    customType = 'package';
  } else if (type === 'order') {
    title = '매장';
    customType = 'order';
  }

  const customDate = date && date.split(' ')[1].split(':');

  return (
    <div className={cx('order-title', customType)}>
      <span className="title">{title}</span>
      {<span className="date">{customDate && `${customDate[0]}:${customDate[1]}`}</span>}
    </div>
  );
};

const OrderComplete = ({ isComplete, status }) => {
  if (isComplete) {
    return (
      <div className="comment">
        {status === 'deliveryDone' ? '완료된 주문입니다.' : '취소된 주문입니다.'}
      </div>
    );
  }

  return null;
};

class Header extends Component<Props> {
  handleRoutes = (go: string) => () => {
    this.props.locationChange(go);
  };

  _goBack = () => {
    this.props.history.goBack();
  };

  openSideMenu = () => {
    this.props.openPopup('sideMenu');
  };

  render() {
    const { customProps, router, order, status, detail } = this.props;

    let isComplete = false;
    if (
      customProps.classname === 'orderDetail done' ||
      customProps.classname === 'orderDetail done cancel'
    ) {
      isComplete = true;
    }

    return (
      <div
        className="header"
        style={customProps.color ? { backgroundColor: customProps.color } : {}}>
        {customProps.buttonOpenSideMenu && <ButtonOpenSideMenu openSideMenu={this.openSideMenu} />}
        {(customProps.detail || customProps.goBack) && <ButtonBack goBack={this._goBack} />}
        <div className="title">{customProps.title}</div>
        {customProps.detail && (
          <OrderType
            type={detail.getIn(['order', 'sub_state'])}
            date={detail.getIn(['order', 'order_date'])}
          />
        )}
        {customProps.buttonClose ? <div className="btn-close" onClick={this._goBack} /> : null}
        <OrderComplete isComplete={isComplete} status={status} />
        {customProps.buttonOpenSideMenu && (
          <TabMenu handleRoutes={this.handleRoutes} path={router.location.pathname} />
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      router: state.get('router'),
      order: state.getIn(['order', 'detail', 'order']),
      status: state.getIn(['order', 'detail', 'orderDetail', 'state']),
      // status: state.getIn(['order', 'detail', 'order', 'status']),
      detail: state.getIn(['order', 'detail']),
    }),
    dispatch => ({
      openPopup: ui => dispatch(openPopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
    })
  )(Header)
);
