import React, { Component } from 'react';

class ManagementAdd extends Component {
  render() {
    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="부관리자명" />
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="btn-wrapper">
          <div className="btn big">등록</div>
        </div>
      </div>
    );
  }
}

export default ManagementAdd;
