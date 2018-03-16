import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetManagers, initSetManager } from '../../actions/ceo';
import { openPopup } from '../../actions/ui';

class ManagementAdd extends Component {
  state = { id: '', name: '', duplicate: false };

  componentDidMount = () => {
    const { initGetManagers, id, secret } = this.props;
    initGetManagers({ id, secret }).then(result => {
      if (!result.success) {
        this._onLogout();
      }
    });
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

  checkDuplicate = (managers, ceoId, userId) => {
    if (ceoId === userId) return true;

    const duplicate = managers.filter(manager => manager.get('id') === userId);

    if (duplicate.size !== 0) {
      return true;
    } else {
      return false;
    }
  };

  validate = () => {
    const { edit, openPopup } = this.props;

    if (edit) {
      if (this.name.value.trim() === '' || this.pw.value.trim() === '') {
        openPopup('fail');
        return true;
      }
      return false;
    } else {
      if (
        this.name.value.trim() === '' ||
        this.pw.value.trim() === '' ||
        this.id.value.toLowerCase().trim() === ''
      ) {
        openPopup('fail');
        return true;
      }
      return false;
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
      first,
      ceoId,
      setFirst,
    } = this.props;

    if (this.validate()) {
      return;
    }

    let duplicate = this.checkDuplicate(managers, ceoId, this.id.value.toLowerCase());
    if (edit) {
      duplicate = false;
    }

    if (duplicate) {
      this.setState(prevState => ({ duplicate: true }));
    } else {
      const manager = managers.filter(manager => manager.get('id') === member);
      const data = manager.toJS();

      const payload = {
        id,
        secret,
        userId: this.id.value.toLowerCase(),
        userPw: this.pw.value,
        userName: this.name.value,
        userRole: edit ? data[0].role : reseller ? 'reseller' : 'manager',
      };

      initSetManager(payload);

      if (first === '1') {
        setFirst();
        navigateTo('/order/reception');
      } else {
        navigateTo('/menus/management');
      }
    }
  };

  _setValue = type => e => {
    e.persist();
    this.setState(prevState => ({ [type]: e.target.value }));
  };

  _onLogout = () => {
    const { logout, navigateTo } = this.props;
    logout();
    navigateTo('/');
  };

  render() {
    const { id, name, duplicate } = this.state;
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
          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="아이디" ref={id => (this.id = id)} />
            {duplicate ? (
              <span
                style={{
                  color: 'red',
                  fontSize: '12px',
                  position: 'absolute',
                  top: '18px',
                  right: 0,
                }}>
                아이디 중복
              </span>
            ) : null}
          </div>
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
    first: state.getIn(['auth', 'first']),
    ceoId: state.getIn(['auth', 'id']),
  }),
  dispatch => ({
    logout: () => dispatch({ type: 'auth/LOGOUT' }),
    initGetManagers: payload => dispatch(initGetManagers(payload)),
    initSetManager: payload => dispatch(initSetManager(payload)),
    navigateTo: route => dispatch(push(route)),
    openPopup: ui => dispatch(openPopup(ui)),
    setFirst: () => dispatch({ type: 'auth/SET_FIRST' }),
  })
)(ManagementAdd);
