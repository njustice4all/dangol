import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import cx from 'classnames';

import { closePopup } from '../actions/ui';
import { initGetShopInfo } from '../actions/ceo';

import { ATY_URI } from '../constants';

class SideMenu extends Component {
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
        type: 'link/OPEN_EXTERNAL_LINK',
        payload: {
          uri: 'http://192.168.10.53:3001/franchise/setShop/1',
        },
      }),
      '*'
    );
  };

  render() {
    const { open, order, shop, siteId, auth, role, session } = this.props;

    return (
      <div className={cx('sidemenu', { active: open })}>
        <div className="menu-wrapper active">
          <div className="header">
            <div className="logo-wrapper">
              <div className="image" style={{ overflow: 'hidden' }}>
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
            <div className="title">{shop.get('name')}</div>
            {/*<div className="sub-title">
              <span className="name">홍길동사장님</span> 안녕하세요.
            </div>*/}
            <div className="btn-wrapper">
              <div className="btn">
                <div className="icon notice">
                  <div className="count">{order.get('lists').size}</div>
                </div>
              </div>
              <div className="btn" onClick={this.goSetting}>
                <div className="icon login" />
              </div>
            </div>
          </div>
          <div className="body">
            <div className="list-wrapper">
              <ul className="list-items">
                <li className="list-item">
                  <div className="content-wrapper">
                    <div className="icon shop" />
                    <div className="title">업소 운영관리</div>
                  </div>
                </li>
                <li className="list-item sub">
                  <div className="content-wrapper">
                    {/*<div className="title" onClick={this.onFranchiseModify}>*/}
                    {role === 'ceo' ? (
                      <div className="title" onClick={this._onPress('/ceo/shop')}>
                        업소 정보 수정
                      </div>
                    ) : null}
                    {role === 'ceo' ? (
                      <div className="title" onClick={this._onPress('/menus/management')}>
                        업소 부관리자 관리
                      </div>
                    ) : null}
                    <div className="title" onClick={this._onPress('/menus/delivery')}>
                      배달 주문 임시 중단
                    </div>
                    {/*<div className="title">업소 통계</div>*/}
                  </div>
                </li>
                <li className="list-item selected">
                  <div className="content-wrapper">
                    <div className="icon setup" />
                    <div className="title" onClick={this._onPress('/menus/setting')}>
                      설정
                    </div>
                  </div>
                </li>
                <li className="list-item">
                  <div className="content-wrapper">
                    <div className="icon custom" />
                    <div className="title">고객센터</div>
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
