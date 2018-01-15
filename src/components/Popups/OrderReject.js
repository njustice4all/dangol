import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { closePopup } from '../../actions/ui';
import { setStatus } from '../../actions/order';

class OrderReject extends Component {
  state = {
    options: [
      { id: 'noResources', selected: false, name: '재료부족', classNames: 'food' },
      { id: 'private', selected: false, name: '업소사정', classNames: 'shop' },
      { id: 'tooFar', selected: false, name: '배달불가지역', classNames: 'mark' },
      { id: 'busy', selected: false, name: '주문량폭주', classNames: 'alarm' },
    ],
  };

  setOptionById = id => () => {
    this.setState(prevState => ({
      options: prevState.options.map(option => {
        if (option.id === id) {
          return { ...option, selected: true };
        }

        return { ...option, selected: false };
      }),
    }));
  };

  onCancelButtonPress = () => this.props.closePopup('reject');

  onAcceptButtonPress = () => {
    const result = this.state.options.filter(option => option.selected);
    if (result.length > 0) {
      console.log(result[0]);
    } else {
      console.log('하나라도 선택해야함');
    }
  };

  render() {
    const { options } = this.state;

    return (
      <div className="popup-container">
        <div className="popup-pannel order-cancel">
          <div className="header">
            <div className="title">취소사유</div>
          </div>
          <div className="body">
            <ul className="list-items">
              {options.map((option, index) => (
                <li
                  className={cx('list-item', { active: option.selected })}
                  onClick={this.setOptionById(option.id)}
                  key={`option-${index}`}>
                  <i className={`icon ${option.classNames}`} />
                  <div className="title">{option.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-wrapper">
            <div className="btn small" onClick={this.onCancelButtonPress}>
              취소
            </div>
            <div className="btn big" onClick={this.onAcceptButtonPress}>
              확인
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  closePopup: ui => dispatch(closePopup(ui)),
  setStatus: status => dispatch(setStatus(status)),
}))(OrderReject);
