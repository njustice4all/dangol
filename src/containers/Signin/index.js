import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initSignin } from '../../actions/auth';

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
      initSignin({ id: 'tiba', pw: 'test1234', autoLogin }).then(value => {
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

    return (
      <div className="body">
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
          {/*<label>
            자동 로그인 <input type="checkbox" checked={autoLogin} onChange={this.handleCheck} />
          </label>*/}
        </span>
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
