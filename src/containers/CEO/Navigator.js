import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cx from 'classnames';

class Navigator extends Component {
  render() {
    const { navigateTo, pathname } = this.props;

    return (
      <div className="ceo-navigator">
        <div
          className={cx('navigator-buttons', { on: pathname === '/ceo/shop' ? true : false })}
          onClick={() => navigateTo('/ceo/shop')}>
          가맹점 정보
        </div>
        <div
          className={cx('navigator-buttons', { on: pathname === '/ceo/products' ? true : false })}
          onClick={() => navigateTo('/ceo/products')}>
          판매 상품 정보
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
)(Navigator);
