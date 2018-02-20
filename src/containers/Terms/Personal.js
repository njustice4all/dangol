import React, { Component } from 'react';

import LOREM from './LOREM';

class Personal extends Component {
  componentDidMount = () => {
    this.props.setTerms(LOREM);
  };

  render() {
    const { terms, setTerms } = this.props;

    return (
      <div className="terms-contents">
        <div className="terms-textarea-wrapper">
          <textarea
            className="terms-textarea"
            value={terms}
            onChange={e => setTerms(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default Personal;
