import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSignin } from '../../actions/auth';

class Signin extends Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.login) {
      this.props.history.push('/order/reception');
    }
  };

  onLoginButtonPress = () => {
    this.props.initSignin({ id: 'hey', pw: 'man' });
  };

  render() {
    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this.onLoginButtonPress}>
            로그인
          </div>
          {/*<div
            className="btn big"
            onClick={() =>
              window.postMessage(
                JSON.stringify({
                  type: 'link/OPEN_EXTERNAL_LINK',
                  payload: {
                    uri: 'https://m.naver.com',
                  },
                }),
                '*'
              )
            }>
            링크
          </div>*/}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    login: state.getIn(['auth', 'status', 'login']),
  }),
  dispatch => ({
    initSignin: user => dispatch(initSignin(user)),
  })
)(Signin);
