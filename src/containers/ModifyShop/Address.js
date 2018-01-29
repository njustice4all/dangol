import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import { initRequestAddress, initRequestLoadMore, resetAddress } from '../../actions/ceo';

const Item = ({ address, setAddress }) => {
  return (
    <div className="address-result" onClick={setAddress(address)}>
      <div className="address-result-content">
        <span className="address-type">도로명</span>
        <p>{address.roadAddrPart1}</p>
      </div>
      <div className="address-result-content">
        <span className="address-type jibun">지번</span>
        <p>{address.jibunAddr}</p>
      </div>
    </div>
  );
};

const Nothing = () => {
  return (
    <div className="result-nothing">
      <h2>검색 결과가 없습니다.</h2>
      <p>정확한 주소 확인 후 다시 입력해 주세요.</p>
    </div>
  );
};

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = { address: [], query: '' };
    this._onKeyUp = debounce(this._onKeyUp, 500);
  }

  componentWillUnmount = () => this.props.resetAddress();

  _onScroll = () => {
    const { initRequestLoadMore, address } = this.props;
    const page = address.get('page');
    const nextPage = parseInt(page.currentPage, 10) + 1;
    const endPosition = this.scroll.scrollHeight - this.scroll.clientHeight;

    if (endPosition === this.scroll.scrollTop) {
      initRequestLoadMore(this.search.value.trim(), nextPage);
    }
  };

  onSearchButtonPress = () => {
    const { initRequestAddress } = this.props;
    if (this.search.value.trim() === '') {
      return;
    }

    initRequestAddress(this.search.value.trim());
  };

  _onKeyUp = e => this.props.initRequestAddress(this.search.value.trim());

  render() {
    const addressList = this.props.address.get('lists');

    return (
      <div className="address__wrapper">
        <header>
          주 소 검 색
          <span onClick={() => this.props.toggleAddress()}>
            <img src="/img/icon-close-white.png" alt="" />
          </span>
        </header>
        <div className="address-content-wrapper">
          <div className="address-search-wrapper">
            <input
              type="text"
              onKeyUp={this._onKeyUp}
              placeholder="예) 대치동 h타워"
              ref={search => (this.search = search)}
            />
            <span onClick={this.onSearchButtonPress}>
              <img src="/img/icon-zoom.png" alt="" />
            </span>
          </div>
          <div
            className={cx('address-result-wrapper', {
              flex: addressList.size === 0,
              center: addressList.size === 0,
            })}
            ref={scroll => (this.scroll = scroll)}
            onScroll={this._onScroll}>
            {addressList.size === 0 ? (
              <Nothing />
            ) : (
              addressList.map((address, index) => (
                <Item address={address} key={index} setAddress={this.props.setAddress} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      address: state.getIn(['ceo', 'address']),
    }),
    dispatch => ({
      initRequestAddress: query => dispatch(initRequestAddress(query)),
      initRequestLoadMore: (query, page) => dispatch(initRequestLoadMore(query, page)),
      resetAddress: () => dispatch(resetAddress()),
    })
  )(Address)
);
