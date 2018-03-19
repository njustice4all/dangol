import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetManagers } from '../../actions/ceo';

import { openPopup } from '../../actions/ui';

const Row = ({ name, id, password, header, deleteMember, goEdit }) => (
  <div className={`tr${header ? ' head' : ''}`} onClick={header ? null : goEdit(id)}>
    <div className="name" style={{ textAlign: 'center' }}>
      {name}
    </div>
    <div className="id" style={{ position: 'relative' }}>
      {id}
      {header ? null : (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '49px',
          }}
          onClick={deleteMember(id)}>
          <img src="/img/delete.svg" style={{ width: '17px' }} />
        </span>
      )}
    </div>
  </div>
);

class Management extends Component {
  state = { showModal: false };

  componentDidMount = () => {
    const { initGetManagers, id, secret } = this.props;
    if (secret) {
      initGetManagers({ id, secret }).then(result => {
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
      initGetManagers({ id, secret }).then(result => {
        if (!result.success) {
          this._onLogout();
        }
      });
    }
  };

  goEdit = member => e => {
    this.props.navigateTo(`/menus/management/${member}`);
  };

  deleteMember = member => e => {
    e.stopPropagation();
    const { openPopup } = this.props;
    openPopup('deleteUser', member);
  };

  _onLogout = () => {
    const { logout, navigateTo } = this.props;
    logout();
    navigateTo('/');
  };

  render() {
    const { managers } = this.props;

    return (
      <div className="body">
        <div className="content-title">부관리자 목록</div>
        <ul className="list-items">
          <li className="list-item">
            <div className="table2">
              <Row name="부관리자명" id="ID" password="비밀번호" header />
              {managers.map((manager, index) => (
                <Row
                  key={`managers-${index}`}
                  name={manager.get('name')}
                  id={manager.get('id')}
                  goEdit={this.goEdit}
                  deleteMember={this.deleteMember}
                />
              ))}
            </div>
          </li>
        </ul>
        <div className="btn-wrapper" style={{ display: 'flex' }}>
          <div
            className="btn big"
            style={{ flex: '1' }}
            onClick={() => this.props.history.push('/menus/management/add')}>
            부관리자 등록 +
          </div>
          <div
            className="btn big"
            style={{ flex: '1', marginLeft: '10px' }}
            onClick={() => this.props.history.push('/menus/management/addReseller')}>
            리셀러 등록 +
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
    initGetManagers: payload => dispatch(initGetManagers(payload)),
    navigateTo: route => dispatch(push(route)),
    openPopup: (ui, payload) => dispatch(openPopup(ui, payload)),
  })
)(Management);
