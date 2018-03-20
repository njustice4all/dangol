// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cx from 'classnames';
import type { List, Map } from 'immutable';

import { openPopup } from '../actions/ui';

import getPayment from '../utils/getPayment';

type Props = {
  customProps: Object,
  order: Object,
  router: Object,
  status: string,
  detail: Object,
  locationChange: string => void,
  history: Object,
  openPopup: string => void,
  first: string,
  processLists: List<Map<string, any>>,
  orderSize: number,
  orderProcessSize: number,
  role: string,
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

// TODO: 어떤방식으로 할것인가...?
const ButtonBack = ({ goBack, first, role }) => {
  if ((first === '1' || first === '') && role === 'ceo') {
    return null;
  }

  return <div className="btn back" onClick={goBack} />;
};

const TabMenu = ({ path, handleRoutes, orderSize, orderProcessSize }) => {
  return (
    <div className="tabmenu item3">
      <ul>
        <li className={cx('tab', { active: path === '/order/reception' ? true : false })}>
          <div onClick={handleRoutes('/order/reception')} style={{ position: 'relative' }}>
            주문접수<span className="count">
              <span>{orderSize || 0}</span>
            </span>
          </div>
        </li>
        <li className={cx('tab', { active: path === '/order/progress' ? true : false })}>
          <div onClick={handleRoutes('/order/progress')} style={{ position: 'relative' }}>
            처리중<span className="count">
              <span>{orderProcessSize || 0}</span>
            </span>
          </div>
        </li>
        <li className={cx('tab', { active: path === '/order/complete' ? true : false })}>
          <div onClick={handleRoutes('/order/complete')}>처리완료</div>
        </li>
      </ul>
    </div>
  );
};

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

const OrderComplete = ({ isComplete, isProgress, status, payment }) => {
  if (isProgress) {
    let text = '주문처리중';
    if (payment === 'mobile') {
      text = '취소처리중';
    }

    return (
      <div className="comment" style={{ color: 'white' }}>
        {text}
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="comment" style={{ color: 'white' }}>
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
    const { router: { location: { pathname } }, locationChange, history: { goBack } } = this.props;
    if (pathname.split('/').includes('management') || pathname.split('/').includes('order')) {
      goBack();
      return;
    }

    // goBack();

    locationChange('/order/reception');
  };

  _closePage = () => {
    const { locationChange } = this.props;
    locationChange('/order/reception');
  };

  openSideMenu = () => {
    this.props.openPopup('sideMenu');
  };

  render() {
    const {
      customProps,
      router,
      order,
      status,
      detail,
      first,
      processLists,
      orderSize,
      orderProcessSize,
      role,
    } = this.props;

    let isComplete = false;
    if (
      customProps.classname === 'orderDetail done' ||
      customProps.classname === 'orderDetail done cancel'
    ) {
      isComplete = true;
    }

    const no = detail.getIn(['order', 'order_no']);
    const type = getPayment(processLists, no);
    const pathname = router.location.pathname;
    let isProgress = false;
    if (pathname.split('/').includes('progress') && pathname.split('/').length > 3) {
      isProgress = true;
    }

    return (
      <div
        className="header"
        style={customProps.color ? { backgroundColor: customProps.color } : {}}>
        {customProps.buttonOpenSideMenu && <ButtonOpenSideMenu openSideMenu={this.openSideMenu} />}
        {(customProps.detail || customProps.goBack) && (
          <ButtonBack goBack={this._goBack} first={first} role={role} />
        )}
        <div className="title">{customProps.title}</div>
        {customProps.detail && (
          <OrderType
            type={detail.getIn(['order', 'sub_state'])}
            date={detail.getIn(['order', 'order_date'])}
          />
        )}
        {customProps.buttonClose ? <div className="btn-close" onClick={this._closePage} /> : null}
        <OrderComplete
          isComplete={isComplete}
          status={status}
          isProgress={isProgress}
          payment={type}
        />
        {customProps.buttonOpenSideMenu && (
          <TabMenu
            handleRoutes={this.handleRoutes}
            path={router.location.pathname}
            orderSize={orderSize}
            orderProcessSize={orderProcessSize}
          />
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
      status: state.getIn(['order', 'detail', 'orderDetail', 0, 'state']),
      detail: state.getIn(['order', 'detail']),
      first: state.getIn(['auth', 'first']),
      processLists: state.getIn(['order', 'processLists']),
      orderSize: state.getIn(['order', 'orderListsObj', 'maxCount']),
      orderProcessSize: state.getIn(['order', 'processListsObj', 'maxCount']),
      role: state.getIn(['auth', 'role']),
    }),
    dispatch => ({
      openPopup: ui => dispatch(openPopup(ui)),
      locationChange: pathname => dispatch(push(pathname)),
    })
  )(Header)
);
