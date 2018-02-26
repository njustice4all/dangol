import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetManagers, initSetManager } from '../../actions/ceo';

class ManagementAdd extends Component {
  state = { id: '', name: '' };

  componentDidMount = () => {
    const { initGetManagers, id, secret } = this.props;
    initGetManagers({ id, secret });
  };

  componentWillReceiveProps = nextProps => {
    const { id, match: { params: { member } } } = this.props;
    if (nextProps.managers.size !== this.props.managers.size) {
      const manager = nextProps.managers.filter(manager => manager.get('id') === id).get(0);
      this.setState(prevState => ({ id: manager.get('id'), name: manager.get('name') }));
      return;
    }

    const manager = this.props.managers.filter(manager => manager.get('id') === member).get(0);

    if (manager) {
      this.setState(prevState => ({ id: manager.get('id'), name: manager.get('name') }));
    }
  };

  _onPress = () => {
    const {
      id,
      secret,
      initSetManager,
      reseller,
      match: { params: { member } },
      edit,
      managers,
      navigateTo,
    } = this.props;
    const manager = managers.filter(manager => manager.get('id') === member);
    const data = manager.toJS();

    const payload = {
      id,
      secret,
      userId: this.id.value,
      userPw: this.pw.value,
      userName: this.name.value,
      userRole: edit ? data[0].role : reseller ? 'reseller' : 'manager',
    };

    initSetManager(payload);
    navigateTo('/menus/management');
  };

  _setValue = type => e => {
    e.persist();
    this.setState(prevState => ({ [type]: e.target.value }));
  };

  render() {
    const { id, name } = this.state;
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
              value={name}
              onChange={this._setValue('name')}
            />
            <input
              type="text"
              placeholder="아이디"
              ref={id => (this.id = id)}
              value={id}
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
    initGetManagers: payload => dispatch(initGetManagers(payload)),
    initSetManager: payload => dispatch(initSetManager(payload)),
    navigateTo: route => dispatch(push(route)),
  })
)(ManagementAdd);
