import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetTerms, initSetTerms } from '../../actions/ceo';

import Textarea from './Textarea';
import Footer from './Footer';
import { TermsNavigator } from '../../components';

class Terms extends Component {
  state = {
    agreementText: '',
    policyCollectAgreeMemberText: '',
    policyText: '',
  };

  // TODO: 변경해야함... 동작은 되는데 마음에 안듬
  componentDidMount = () => {
    const { siteId, initGetTerms } = this.props;
    if (siteId) {
      initGetTerms({
        siteId,
        lists: ['agreementText', 'policyCollectAgreeMemberText', 'policyText'],
      }).then(result => {
        this.setState(prevState => ({
          agreementText: result.list.agreementText,
          policyCollectAgreeMemberText: result.list.policyCollectAgreeMemberText,
          policyText: result.list.policyText,
        }));
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.siteId !== this.props.siteId) {
      const { initGetTerms } = this.props;
      initGetTerms({
        siteId: nextProps.siteId,
        lists: ['agreementText', 'policyCollectAgreeMemberText', 'policyText'],
      }).then(result => {
        this.setState(prevState => ({
          agreementText: result.list.agreementText,
          policyCollectAgreeMemberText: result.list.policyCollectAgreeMemberText,
          policyText: result.list.policyText,
        }));
      });
    }
  };

  setTerms = (type, value) => {
    this.setState(prevState => ({ [type]: value }));
  };

  onCancel = () => {
    this.props.navigateTo('/ceo/shop');
  };

  onModify = () => {
    const { agreementText, policyCollectAgreeMemberText, policyText } = this.state;
    const { initSetTerms, siteId, match: { params: { options } } } = this.props;

    if (options === 'use') {
      initSetTerms({ siteId, data: { agreementText } });
    } else if (options === 'personal') {
      initSetTerms({ siteId, data: { policyText } });
    } else {
      initSetTerms({ siteId, data: { policyCollectAgreeMemberText } });
    }
  };

  render() {
    const { match: { params: { options } } } = this.props;
    const { agreementText, policyCollectAgreeMemberText, policyText } = this.state;

    return (
      <div className="terms-screen">
        <TermsNavigator />
        <div className="terms-top-divider" />
        <Route
          path="/ceo/terms/use"
          render={props => (
            <Textarea {...props} terms={agreementText} setTerms={this.setTerms} options={options} />
          )}
        />
        <Route
          path="/ceo/terms/personal"
          render={props => (
            <Textarea {...props} terms={policyText} setTerms={this.setTerms} options={options} />
          )}
        />
        <Route
          path="/ceo/terms/agreement"
          render={props => (
            <Textarea
              {...props}
              terms={policyCollectAgreeMemberText}
              setTerms={this.setTerms}
              options={options}
            />
          )}
        />
        <Footer onCancel={this.onCancel} onModify={this.onModify} />
      </div>
    );
  }
}

export default connect(
  state => ({
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    navigateTo: route => dispatch(push(route)),
    initGetTerms: payload => dispatch(initGetTerms(payload)),
    initSetTerms: payload => dispatch(initSetTerms(payload)),
  })
)(Terms);
