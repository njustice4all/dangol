// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

type Props = {
  version: string,
  history: Object,
  role: string,
  push: boolean,
  togglePush: () => void,
};

type ContentProps = {
  title: string,
  content: string,
  onPress?: () => void,
};

const Content = ({ title, content, onPress }: ContentProps) => (
  <div className="content-wrapper">
    <div className="title">{title}</div>
    <div className="content" onClick={onPress}>
      {content}
    </div>
  </div>
);

class Setting extends Component<Props> {
  setSound = () => {
    window.postMessage(JSON.stringify({ type: 'settings/SET_SOUND', payload: {} }), '*');
  };

  render() {
    const { version, role, push, togglePush } = this.props;
    let content = role === 'ceo' ? '사장님 계정 정보' : '내 계정 정보';

    return (
      <div className="body">
        <Content title="소리설정" content="신규 주문 접수 알림" />
        {/*<div className="content-wrapper">
          <div className="title">푸시</div>
          <div className="content" style={{ position: 'relative' }}>
            푸시알람
            <span style={{ position: 'absolute', display: 'flex', top: '-5px', right: '15px' }}>
              <div className="switch-wrapper" onClick={togglePush}>
                <div className={cx('switch', push ? 'on' : 'off')} />
              </div>
            </span>
          </div>
        </div>*/}
        <Content title="앱 정보" content={`버전정보 ${version}`} />
        <Content
          title="앱 계정 설정"
          content={content}
          onPress={() => this.props.history.push('/menus/admin')}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    version: state.getIn(['setting', 'version']),
    role: state.getIn(['auth', 'role']),
    push: state.getIn(['setting', 'push']),
  }),
  dispatch => ({
    togglePush: () => dispatch({ type: 'setting/TOGGLE_PUSH' }),
  })
)(Setting);
