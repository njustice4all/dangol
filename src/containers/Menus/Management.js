import React, { Component } from 'react';
import { connect } from 'react-redux';

const Row = ({ name, id, password, header }) => (
  <div className={`tr${header ? ' head' : ''}`}>
    <div className="name">{name}</div>
    <div className="id">{id}</div>
    <div className="pw">{password}</div>
  </div>
);

class Management extends Component {
  render() {
    return (
      <div className="body">
        <div className="content-title">부관리자 목록</div>
        <ul className="list-items">
          <li className="list-item">
            <div className="table2">
              <Row name="부관리자명" id="ID" password="비밀번호" header />
              <Row name="김아티" id="kimaty" password="qwe12345" />
              <Row name="김가티" id="kimgaty" password="q1w2e3" />
              <Row name="김나티" id="kimnaty" password="1q2w3e" />
            </div>
          </li>
        </ul>
        <div className="btn-wrapper">
          <div className="btn big" onClick={() => this.props.history.push('/menus/management/add')}>
            부관리자 등록 +
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Management);
