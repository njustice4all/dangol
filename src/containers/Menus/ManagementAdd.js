import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSetManager } from '../../actions/ceo';

class ManagementAdd extends Component {
  _onPress = () => {
    const { id, secret, initSetManager, reseller } = this.props;
    const payload = {
      id,
      secret,
      userId: this.id.value,
      userPw: this.pw.value,
      userName: this.name.value,
      userRole: '',
    };

    if (reseller) {
      initSetManager({ ...payload, userRole: 'reseller' });
    } else {
      initSetManager(payload);
    }
  };

  render() {
    const { match: { params: { member } }, edit, managers } = this.props;
    const manager = managers.filter(manager => manager.get('id') === member);
    const data = manager.toJS();

    if (edit) {
      return (
        <div className="body">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="부관리자명"
              ref={name => (this.name = name)}
              defaultValue={data[0] && data[0].name}
            />
            <input
              type="text"
              placeholder="아이디"
              ref={id => (this.id = id)}
              defaultValue={data[0] && data[0].id}
              disabled
            />
            <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
          </div>
          <div className="btn-wrapper">
            <div className="btn big" onClick={this._onPress}>
              정보수정
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="body">
        <div className="input-wrapper">
          <input type="text" placeholder="부관리자명" ref={name => (this.name = name)} />
          <input type="text" placeholder="아이디" ref={id => (this.id = id)} />
          <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this._onPress}>
            등록
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    managers: state.getIn(['ceo', 'managers']),
    id: state.getIn(['auth', 'id']),
    secret: state.getIn(['auth', 'secret']),
  }),
  dispatch => ({
    initSetManager: payload => dispatch(initSetManager(payload)),
  })
)(ManagementAdd);
