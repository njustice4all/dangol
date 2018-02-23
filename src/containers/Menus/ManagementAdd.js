import React, { Component } from 'react';

class ManagementAdd extends Component {
  _onPress = () => {
    console.log(this.name.value, this.id.value, this.pw.value);
  };

  render() {
    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="부관리자명" ref={name => (this.name = name)} />
          <input type="text" placeholder="아이디" ref={id => (this.id = id)} />
          <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this._onPress}>
            등록
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementAdd;
