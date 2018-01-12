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
    // coordsBatchActions: (a, b) => dispatch(coordsBatchActions(a, b)),
  })
)(Signin);
