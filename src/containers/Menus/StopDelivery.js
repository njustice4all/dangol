import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { initGetPauseOrder, initSetPauseOrder } from '../../actions/setting';

const styles = {
  btnWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#fe931f',
    padding: '14px',
    color: 'white',
    fontSize: '18px',
  },
};

class StopDelivery extends Component {
  state = { isStop: false, time: { start: '', end: '' } };

  componentDidMount = () => {
    const { initGetPauseOrder, siteId, delivery } = this.props;
    initGetPauseOrder({
      siteId,
      lists: ['deliveryStopFlag', 'deliveryStopStart', 'deliveryStopEnd'],
    });

    /**
     * set pause order에서 바꾼값으로 state를 변경하기때문에
     * get pause order에서 얻어온값이 현재 state와 같다
     * componentWillReceiveProps가 실행이 안되기 때문에 did mount에서 state변경함
     */
    this.setState(prevState => ({
      isStop: delivery.get('isStop'),
      time: {
        start: delivery.getIn(['time', 'start']),
        end: delivery.getIn(['time', 'end']),
      },
    }));
  };

  componentWillReceiveProps = nextProps => {
    this.setState(prevState => ({
      isStop: nextProps.delivery.get('isStop'),
      time: {
        start: nextProps.delivery.getIn(['time', 'start']),
        end: nextProps.delivery.getIn(['time', 'end']),
      },
    }));
  };

  _toggle = () => this.setState(prevState => ({ isStop: !prevState.isStop }));

  _onPress = () => {
    const { navigateTo, initSetPauseOrder, siteId } = this.props;
    const { isStop, time } = this.state;

    initSetPauseOrder({
      siteId,
      data: {
        deliveryStopFlag: isStop ? '1' : '0',
        deliveryStopStart: time.start,
        deliveryStopEnd: time.end,
      },
    });

    navigateTo('/order/reception');
  };

  setTime = type => e => {
    e.persist();
    this.setState(prevState => ({ time: { ...prevState.time, [type]: e.target.value } }));
  };

  render() {
    const { isStop, time } = this.state;

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
                  <div className="content">
                    <div style={{ display: 'flex' }}>
                      <label onClick={() => this.left.click()}>
                        <input
                          ref={left => (this.left = left)}
                          type="time"
                          style={{ position: 'absolute', width: '1px', height: '1px' }}
                          value={time.start}
                          onChange={this.setTime('start')}
                        />
                        {this.state.time.start}
                      </label>
                      <span style={{ margin: '0 15px' }}> ~ </span>
                      <label onClick={() => this.right.click()}>
                        <input
                          ref={right => (this.right = right)}
                          type="time"
                          style={{ position: 'absolute', width: '1px', height: '1px' }}
                          value={time.end}
                          onChange={this.setTime('end')}
                        />
                        {this.state.time.end}
                      </label>
                    </div>
                  </div>
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
        <div style={styles.btnWrapper}>
          <div onClick={this._onPress}>저장하기</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    delivery: state.getIn(['setting', 'delivery']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    initGetPauseOrder: payload => dispatch(initGetPauseOrder(payload)),
    initSetPauseOrder: payload => dispatch(initSetPauseOrder(payload)),
    navigateTo: route => dispatch(push(route)),
  })
)(StopDelivery);
