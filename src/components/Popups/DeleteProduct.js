import React, { Component } from 'react';

class DeleteProduct extends Component {
  render() {
    const { remove, closeModal } = this.props;

    return (
      <div className="popup-container">
        <div className="popup-pannel user-del">
          <div className="header" style={{ height: 'auto' }}>
            <div className="title">
              <span className="alert">상품 삭제</span>
            </div>
          </div>
          <div className="body">
            <div className="content-wrapper" style={{ paddingTop: '50px' }}>
              <div>정말 삭제하시겠어요?</div>
            </div>
          </div>
          <div className="btn-wrapper">
            <div className="btn small" onClick={closeModal}>
              취소
            </div>
            <div className="btn big" onClick={remove}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteProduct;
