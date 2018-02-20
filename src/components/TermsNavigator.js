import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cx from 'classnames';

class Termsnavigator extends Component {
  render() {
    const { navigateTo, pathname } = this.props;

    return (
      <div className="ceo-navigator">
        <div
          className={cx('navigator-buttons', { on: pathname === '/ceo/terms/use' ? true : false })}
          onClick={() => navigateTo('/ceo/terms/use')}>
          이용약관
        </div>
        <div
          className={cx('navigator-buttons', {
            on: pathname === '/ceo/terms/personal' ? true : false,
          })}
          onClick={() => navigateTo('/ceo/terms/personal')}>
          개인정보취급방침
        </div>
        <div
          className={cx('navigator-buttons', {
            on: pathname === '/ceo/terms/agreement' ? true : false,
          })}
          onClick={() => navigateTo('/ceo/terms/agreement')}>
          개인정보수집동의
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    pathname: state.get('router').location.pathname,
  }),
  dispatch => ({
    navigateTo: route => dispatch(push(route)),
  })
)(Termsnavigator);
