import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Use from './Use';
import Agreement from './Agreement';
import Personal from './Personal';
import Footer from './Footer';
import { TermsNavigator } from '../../components';

class Terms extends Component {
  state = {
    terms: '',
  };

  setTerms = value => {
    this.setState(prevState => ({ terms: value }));
  };

  onCancel = () => {
    console.log('취소');
  };

  onModify = () => {
    console.log('수정', this.state.terms);
  };

  render() {
    const { terms } = this.state;

    return (
      <div className="terms-screen">
        <TermsNavigator />
        <div className="terms-top-divider" />
        <Route
          path="/ceo/terms/use"
          render={props => <Use {...props} terms={terms} setTerms={this.setTerms} />}
        />
        <Route
          path="/ceo/terms/personal"
          render={props => <Personal {...props} terms={terms} setTerms={this.setTerms} />}
        />
        <Route
          path="/ceo/terms/agreement"
          render={props => <Agreement {...props} terms={terms} setTerms={this.setTerms} />}
        />
        <Footer onCancel={this.onCancel} onModify={this.onModify} />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  navigateTo: route => dispatch(push(route)),
}))(Terms);
