import React, { Component } from 'react';

class EditAdmin extends Component {
  render() {
    return (
      <div className="body">
        <div className="input-wrapper">
          <div style={{ fontSize: '20px', color: '#fe931f', marginBottom: '20px' }}>
            김홍주 사장님
          </div>
          <div style={{ fontSize: '20px' }}>KIMATY01</div>
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="btn-wrapper">
          <div className="btn big">정보 수정</div>
        </div>
      </div>
    );
  }
}

export default EditAdmin;
