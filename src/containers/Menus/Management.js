import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setDeliveryStop } from '../../actions/setting';

const styles = {
  btnWrapper: {
    position: 'fixed',
    padding: 0,
  },
  btn: {
    borderRadius: 0,
  },
};

class Management extends Component {
  constructor(props) {
    super(props);

    this.state = { isStop: props.delivery.get('isStop'), time: props.delivery.get('time') };
  }

  _toggle = () => this.setState(prevState => ({ isStop: !prevState.isStop }));

  _onPress = () => this.props.setDeliveryStop(this.state);

  render() {
    const { isStop } = this.state;

    return (
      <div className="body">
        <ul className="list-items">
          <li className="list-item">
            <div className="table">
              <div className="tr">
                <div className="title">배달주문중단</div>
                <div className="content">
                  <div className="switch-wrapper">
                    <div className={`switch ${isStop ? 'on' : 'off'}`} onClick={this._toggle} />
                  </div>
                </div>
              </div>
              {isStop ? (
                <div className="tr">
                  <div className="title">중단시간</div>
                  <div className="content">12:00 ~ 24:00</div>
                </div>
              ) : null}
            </div>
          </li>
          <li className="list-item">
            <div className="content-wrapper">
              <div className="title-wrapper">
                <div className="icon delivery" />
                <div className="title">배달주문 임시 중단이란?</div>
              </div>
              <div className="content">
                <span>영업중에 배달 주문을 받을 수 없는 경우</span>
                <br />
                <span className="alert">설정한 시간동안 임시로 배달 주문을 중단</span>
                <span>
                  하는<br />기능입니다.
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div className="btn-wrapper" style={styles.btnWrapper}>
          <div className="btn big" style={styles.btn} onClick={this._onPress}>
            저장하기
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    delivery: state.getIn(['setting', 'delivery']),
  }),
  dispatch => ({
    setDeliveryStop: (isStop, time) => dispatch(setDeliveryStop(isStop, time)),
  })
)(Management);
