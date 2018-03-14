import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetManagers, initSetManager } from '../../actions/ceo';
import { openPopup } from '../../actions/ui';

class EditAdmin extends Component {
  componentDidMount = () => {
    const { initGetManagers, id, secret, managers } = this.props;
    if (secret) {
      initGetManagers({ id, secret, ceo: true }).then(result => {
        if (!result.success) {
          this._onLogout();
        }
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initGetManagers } = this.props;

    if (nextProps.secret !== this.props.secret) {
      const { id, secret } = nextProps;
      initGetManagers({ id, secret, ceo: true }).then(result => {
        if (!result.success) {
          this._onLogout();
        }
      });
    }
  };

  _onLogout = () => {
    const { logout, navigateTo } = this.props;
    logout();
    navigateTo('/');
  };

  _onModify = () => {
    const {
      id,
      secret,
      initSetManager,
      managers,
      navigateTo,
      first,
      setFirst,
      openPopup,
    } = this.props;

    if (this.pw.value.trim() === '') {
      openPopup('fail');
      return;
    }

    const payload = {
      id,
      secret,
      userId: managers.getIn([0, 'id']),
      userPw: this.pw.value,
    };

    if (first === '1') {
      setFirst();
    }

    initSetManager(payload);
    navigateTo('/order/reception');
  };

  render() {
    const { managers, id } = this.props;
    const manager = managers.filter(manager => manager.get('id') === id);

    return (
      <div className="body">
        <div className="input-wrapper">
          <div style={{ fontSize: '20px', color: '#fe931f', marginBottom: '20px' }}>
            {manager.getIn([0, 'name'])}
          </div>
          <div style={{ fontSize: '20px' }}>{manager.getIn([0, 'id'])}</div>
          <input type="password" placeholder="비밀번호" ref={pw => (this.pw = pw)} />
          {/*<input
            type="password"
            placeholder="비밀번호 확인"
            ref={repeat => (this.repeat = repeat)}
          />*/}
        </div>
        <div className="btn-wrapper" style={{ display: 'flex' }}>
          <div className="btn big" onClick={this._onModify} style={{ flex: '1' }}>
            비밀번호 변경
          </div>
          <div
            className="btn big"
            onClick={this._onLogout}
            style={{ flex: '1', marginLeft: '10px', backgroundColor: '#505050' }}>
            로그아웃
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    id: state.getIn(['auth', 'id']),
    first: state.getIn(['auth', 'first']),
    secret: state.getIn(['auth', 'secret']),
    managers: state.getIn(['ceo', 'managers']),
  }),
  dispatch => ({
    logout: () => dispatch({ type: 'auth/LOGOUT' }),
    navigateTo: route => dispatch(push(route)),
    initGetManagers: payload => dispatch(initGetManagers(payload)),
    initSetManager: payload => dispatch(initSetManager(payload)),
    setFirst: () => dispatch({ type: 'auth/SET_FIRST' }),
    openPopup: ui => dispatch(openPopup(ui)),
  })
)(EditAdmin);
