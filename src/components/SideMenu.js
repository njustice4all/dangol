import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import { closePopup } from '../actions/ui';

class SideMenu extends Component {
  _onPress = pathname => () => {
    this.props.closePopup('sideMenu');
    this.props.history.push(pathname);
  };

  render() {
    const { open } = this.props;

    return (
      <div className={cx('sidemenu', { active: open })}>
        <div className="menu-wrapper active">
          <div className="header">
            <div className="logo-wrapper">
              <div className="image">
                <input type="file" />
              </div>
            </div>
            <div className="title">교촌치킨 선릉점</div>
            <div className="sub-title">
              <span className="name">홍길동사장님</span> 안녕하세요.
            </div>
            <div className="btn-wrapper">
              <div className="btn">
                <div className="icon notice">
                  <div className="count">5</div>
                </div>
              </div>
              <div className="btn">
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
                    <div className="title">업소 정보 수정</div>
                    <div className="title" onClick={this._onPress('/menus/management')}>
                      업소 부관리자 관리
                    </div>
                    <div className="title" onClick={this._onPress('/menus/delivery')}>
                      배달 주문 임시 중단
                    </div>
                    <div className="title">업소 통계</div>
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
                <li className="list-item sub">
                  <div className="content-wrapper">
                    <div className="title selected">앱 이용안내</div>
                    <div className="title">1:1 문의</div>
                    <div className="title">자주묻는 질문</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(null, dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
  }))(SideMenu)
);
