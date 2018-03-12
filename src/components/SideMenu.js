import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import cx from 'classnames';

import { closePopup } from '../actions/ui';
import { initGetShopInfo } from '../actions/ceo';

import { ATY_URI } from '../constants';

class SideMenu extends Component {
  state = { modifyShop: false, management: false, stopOrder: false, setting: false, faq: false };

  componentDidMount = () => {
    const { initGetShopInfo, siteId } = this.props;
    if (siteId) {
      initGetShopInfo({ siteId });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.siteId !== nextProps.siteId) {
      this.props.initGetShopInfo({ siteId: nextProps.siteId });
    }
  };

  _onPress = pathname => () => {
    this.props.closePopup('sideMenu');
    this.props.history.push(pathname);
  };

  goSetting = () => {
    this.props.closePopup('sideMenu');
    this.props.navigateTo('/menus/admin');
  };

  onFranchiseModify = () => {
    window.postMessage(
      JSON.stringify({
        type: 'redux/action',
        payload: {
          type: 'ceo/NAVIGATE_TO_SHOP',
        },
      }),
      '*'
    );
    this.props.closePopup('sideMenu');
  };

  _onTouchStart = name => () => {
    this.setState(prevState => ({ [name]: true }));
  };

  _onTouchEnd = name => () => {
    this.setState(prevState => ({ [name]: false }));
  };

  render() {
    const { open, order, shop, siteId, auth, role, session } = this.props;
    const { modifyShop, management, stopOrder, setting, faq } = this.state;

    return (
      <div className={cx('sidemenu', { active: open })}>
        <div className="menu-wrapper active">
          <div className="drawer-header">
            <div className="drawer-logo-wrapper">
              <div className="drawer-image" style={{ overflow: 'hidden', marginTop: '24px' }}>
                {shop.size > 0 ? (
                  <img
                    src={`${ATY_URI}/aty_image_view.php?siteId=${siteId}&iID=${shop.getIn([
                      'mainImage',
                      0,
                    ])}&sessId=${session}&thumb=1`}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : null}
              </div>
            </div>
            <div className="drawer-title">{shop.get('name')}</div>
            {/*<div className="sub-title">
              <span className="name">홍길동사장님</span> 안녕하세요.
            </div>*/}
            <div className="btn-wrapper">
              <div className="btn">
                <div className="icon notice">
                  <div
                    className="count"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{order.get('lists').size}</span>
                  </div>
                </div>
              </div>
              <div className="btn" onClick={this.goSetting}>
                <div className="icon login" />
              </div>
            </div>
          </div>
          <div className="body">
            <div className="list-wrapper">
              <ul className="drawer-list-items">
                <li className="drawer-list-item">
                  <div className="drawer-content-wrapper">
                    <div className="icon shop" />
                    <div className="drawer-title">업소 운영관리</div>
                  </div>
                </li>
                <li className="drawer-list-item sub">
                  <div className="drawer-content-wrapper">
                    {role === 'manager' ? null : (
                      <div
                        className={cx('drawer-title', { selected: modifyShop })}
                        onClick={this._onPress('/ceo/shop')}
                        onTouchStart={this._onTouchStart('modifyShop')}
                        onTouchEnd={this._onTouchEnd('modifyShop')}>
                        업소 정보 수정
                      </div>
                    )}
                    {role === 'ceo' ? (
                      <div
                        className={cx('drawer-title', { selected: management })}
                        onClick={this._onPress('/menus/management')}
                        onTouchStart={this._onTouchStart('management')}
                        onTouchEnd={this._onTouchEnd('management')}>
                        업소 부관리자 관리
                      </div>
                    ) : null}
                    <div
                      className={cx('drawer-title', { selected: stopOrder })}
                      onClick={this._onPress('/menus/delivery')}
                      onTouchStart={this._onTouchStart('stopOrder')}
                      onTouchEnd={this._onTouchEnd('stopOrder')}>
                      배달 주문 임시 중단
                    </div>
                    {/*<div className="title">업소 통계</div>*/}
                  </div>
                </li>
                <li
                  className={cx('drawer-list-item', { selected: setting })}
                  onTouchStart={this._onTouchStart('setting')}
                  onTouchEnd={this._onTouchEnd('setting')}>
                  <div className="drawer-content-wrapper">
                    <div className="icon setup" />
                    <div className="drawer-title" onClick={this._onPress('/menus/setting')}>
                      설정
                    </div>
                  </div>
                </li>
                <li
                  className={cx('drawer-list-item', { selected: faq })}
                  onTouchStart={this._onTouchStart('faq')}
                  onTouchEnd={this._onTouchEnd('faq')}>
                  <div className="drawer-content-wrapper">
                    <div className="icon custom" />
                    <div className="drawer-title">고객센터</div>
                  </div>
                </li>
                {/*<li className="list-item sub">
                  <div className="content-wrapper">
                    <div className="title selected">앱 이용안내</div>
                    <div className="title">1:1 문의</div>
                    <div className="title">자주묻는 질문</div>
                  </div>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      order: state.get('order'),
      session: state.getIn(['auth', 'session']),
      siteId: state.getIn(['auth', 'siteId']),
      shop: state.getIn(['ceo', 'shop']),
      role: state.getIn(['auth', 'role']),
    }),
    dispatch => ({
      closePopup: ui => dispatch(closePopup(ui)),
      initGetShopInfo: payload => dispatch(initGetShopInfo(payload)),
      navigateTo: route => dispatch(push(route)),
    })
  )(SideMenu)
);
