import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetManagers, initSetManager } from '../../actions/ceo';

class EditAdmin extends Component {
  componentDidMount = () => {
    const { initGetManagers, id, secret, managers } = this.props;
    // console.log(id, managers.toJS());
    if (secret) {
      initGetManagers({ id, secret, ceo: true });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initGetManagers } = this.props;

    if (nextProps.secret !== this.props.secret) {
      const { id, secret } = nextProps;
      initGetManagers({ id, secret, ceo: true });
    }
  };

  _onLogout = () => {
    const { logout, navigateTo } = this.props;
    logout();
    navigateTo('/');
  };

  _onModify = () => {
    const { id, secret, initSetManager, managers, navigateTo } = this.props;
    const payload = {
      id,
      secret,
      userId: managers.getIn([0, 'id']),
      userPw: this.pw.value,
    };

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
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this._onModify}>
            정보 수정
          </div>
        </div>
        <div className="btn-wrapper">
          <div className="btn big" onClick={this._onLogout}>
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
    secret: state.getIn(['auth', 'secret']),
    managers: state.getIn(['ceo', 'managers']),
  }),
  dispatch => ({
    logout: () => dispatch({ type: 'auth/LOGOUT' }),
    navigateTo: route => dispatch(push(route)),
    initGetManagers: payload => dispatch(initGetManagers(payload)),
    initSetManager: payload => dispatch(initSetManager(payload)),
  })
)(EditAdmin);
