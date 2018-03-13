import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.7)',
        }}>
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    );
  }
}

export default Loading;
