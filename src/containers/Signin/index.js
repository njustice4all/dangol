import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initSignin } from '../../actions/auth';
import { Loading } from '../../components';

class Signin extends Component {
  state = { autoLogin: false };

  componentWillReceiveProps = nextProps => {
    if (nextProps.login) {
      this.props.locationChange('/order/reception');
    }
  };

  onLoginButtonPress = () => {
    const { initSignin, locationChange } = this.props;
    const { autoLogin } = this.state;
    const id = this.id.value;
    const pw = this.pw.value;

    try {
      initSignin({ id, pw, autoLogin }).then(value => {
        if (value.redirect) {
          if (value.role === 'manager' || value.role === 'reseller') {
            locationChange(`/menus/management/${id}`);
          } else {
            locationChange('/menus/admin');
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleCheck = e => {
    e.persist();
    this.setState(prevState => ({ autoLogin: e.target.checked }));
  };

  render() {
    const { autoLogin } = this.state;
    const { isFetching } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="body">
        <div className="login-greeting-wrapper">
          <div className="login-logo">
            <div className="logo-background">
              <img src="/img/logo.svg" />
            </div>
          </div>
          <div className="login-text">
            <div>
              단골<span className="text-bold">사장님</span>
            </div>
          </div>
        </div>
        <div className="input-wrapper">
          <input type="text" placeholder="아이디" ref={id => (this.id = id)} />
          <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
        </div>
        <span
          style={{
            display: 'block',
            textAlign: 'right',
            paddingRight: '20px',
          }}>
          <label>
            자동 로그인 <input type="checkbox" checked={autoLogin} onChange={this.handleCheck} />
          </label>
        </span>
        <div className="btn-wrapper">
          <div
            className="btn big"
            onClick={this.onLoginButtonPress}
            style={{ fontWeight: 'normal' }}>
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
    isFetching: state.getIn(['auth', 'isFetching']),
  }),
  dispatch => ({
    initSignin: user => dispatch(initSignin(user)),
    locationChange: pathname => dispatch(push(pathname)),
  })
)(Signin);
