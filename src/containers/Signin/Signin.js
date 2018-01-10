import React, { Component } from 'react';

class Signin extends Component {
  onLogginButtonPress = () => {
    this.props.history.push('/order/reception');
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          onClick={this.onLogginButtonPress}
          style={{
            fontSize: 24,
            padding: '10px',
            width: '80%',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            marginTop: '50px',
          }}>
          로그인
        </div>
      </div>
    );
  }
}

export default Signin;
