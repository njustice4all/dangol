import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closePopup } from '../../actions/ui';
import { initDeleteManager } from '../../actions/ceo';

class UserDel extends Component {
  onConfirm = () => {
    const { id, secret, member, closePopup, initDeleteManager } = this.props;

    initDeleteManager({ id, secret, member: '' });
    closePopup('deleteUser');
  };

  render() {
    const { closePopup } = this.props;

    return (
      <div className="popup-container">
        <div className="popup-pannel user-del">
          <div className="header" style={{ height: 'auto' }}>
            <div className="title">
              <span>부관리자</span> <span className="alert">계정 삭제</span>
            </div>
          </div>
          <div className="body">
            <div className="content-wrapper">
              <div>정말 삭제하시겠어요?</div>
              <div>삭제 후 로그인이 불가합니다.</div>
            </div>
            <div className="btn-wrapper" style={{ padding: 0, position: 'absolute' }}>
              <div className="btn small" onClick={() => closePopup('deleteUser')}>
                취소
              </div>
              <div className="btn big" onClick={this.onConfirm}>
                확인
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    member: state.getIn(['ui', 'payload']),
    id: state.getIn(['auth', 'id']),
    secret: state.getIn(['auth', 'secret']),
  }),
  dispatch => ({
    closePopup: ui => dispatch(closePopup(ui)),
    initDeleteManager: payload => dispatch(initDeleteManager(payload)),
  })
)(UserDel);
