import React, { Component } from 'react';
import { connect } from 'react-redux';

class Setting extends Component {
  render() {
    const { version } = this.props;

    return (
      <div className="body">
        <div className="content-wrapper">
          <div className="title">소리설정</div>
          <div className="content">신규 주문 접수 알림</div>
        </div>
        <div className="content-wrapper">
          <div className="title">앱 정보</div>
          <div className="content">버전정보 {version}</div>
        </div>
        <div className="btn-wrapper">
          <div className="btn big">로그아웃</div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  version: state.getIn(['setting', 'version']),
}))(Setting);
