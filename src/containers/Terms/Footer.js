import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { onModify, onCancel } = this.props;

    return (
      <div className="terms-footer-wrapper">
        <div className="terms-bottom-divider" />
        <div className="terms-button-wrapper">
          <div className="terms-footer-buttons cancel" onClick={onCancel}>
            취소하기
          </div>
          <div className="terms-footer-buttons" onClick={onModify}>
            수정하기
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
