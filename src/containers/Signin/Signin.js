import React, { Component } from 'react';

class Signin extends Component {
  onLogginButtonPress = () => {
    this.props.history.push('/order/reception');
  };

  render() {
    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this.onLogginButtonPress}>
            로그인
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
