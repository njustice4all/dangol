// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  version: string,
  history: Object,
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
    const { version } = this.props;

    return (
      <div className="body">
        <Content title="소리설정" content="신규 주문 접수 알림" />
        <Content title="앱 정보" content={`버전정보 ${version}`} />
        <Content
          title="앱 계정 설정"
          content="사장님 계정 정보 수정"
          onPress={() => this.props.history.push('/menus/admin')}
        />
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
