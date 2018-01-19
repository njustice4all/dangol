import React, { Component } from 'react';

class UserDel extends Component {
  render() {
    return (
      <div className="popup-container">
        <div className="popup-pannel user-del">
          <div className="header">
            <div className="title">
              <span>부관리자</span> <span className="alert">계정 삭제</span>
            </div>
          </div>
          <div className="body">
            <div className="content-wrapper">
              <div>정말 삭제하시겠어요?</div>
              <div>삭제 후 로그인이 불가합니다.</div>
            </div>
          </div>
          <div className="btn-wrapper">
            <div className="btn small">취소</div>
            <div className="btn big">확인</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDel;
