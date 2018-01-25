import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initSignin } from '../../actions/auth';

class Signin extends Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.login) {
      // this.props.history.push('/order/reception');
      this.props.locationChange('/order/reception');
    }
  };

  onLoginButtonPress = () => {
    this.props.initSignin({ id: this.id.value, pw: this.pw.value, autoLogin: true });
    // this.props.test();
  };

  render() {
    // if (this.props.login) {
    //   return <Redirect to="/order/reception" />;
    // }

    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="아이디" ref={id => (this.id = id)} />
          <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
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
    locationChange: pathname => dispatch(push(pathname)),
  })
)(Signin);
