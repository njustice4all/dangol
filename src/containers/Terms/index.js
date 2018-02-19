import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Use from './Use';
import Agreement from './Agreement';
import Personal from './Personal';

class Terms extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.navigateTo('/ceo/terms/use')}>Hey</button>
        <button onClick={() => this.props.navigateTo('/ceo/terms/personal')}>Man</button>
        <button onClick={() => this.props.navigateTo('/ceo/terms/agreement')}>Wow</button>
        <Route path="/ceo/terms/use" render={props => <Use {...props} />} />
        <Route path="/ceo/terms/personal" render={props => <Personal {...props} />} />
        <Route path="/ceo/terms/agreement" render={props => <Agreement {...props} />} />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  navigateTo: route => dispatch(push(route)),
}))(Terms);
