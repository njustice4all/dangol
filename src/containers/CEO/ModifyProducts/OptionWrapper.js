import React, { Component } from 'react';
import cx from 'classnames';

class OptionWrapper extends Component {
  render() {
    const {
      options,
      _onChangeOptionByKey,
      _onDeleteOption,
      _onAddOption,
      _onAddProperty,
      _onDeleteProperty,
      _onChangeOptionName,
    } = this.props;

    return (
      <div className="row-wrapper options" style={{ position: 'relative' }}>
        <div className="option-wrapper" style={{ paddingTop: 0 }}>
          {options.map((option, index) => (
            <div className="options" key={`options-${index}`}>
              <div className="option-title-wrapper">
                <div className="option-name" style={{ display: 'inline-block', width: '65px' }}>
                  옵션명
                </div>
                <input
                  type="text"
                  value={option.get('option_name')}
                  onChange={_onChangeOptionName(index)}
                />
                <div className="button-delete" onClick={_onDeleteOption(index)}>
                  <img src="/img/icon-close.png" alt="" />
                </div>
              </div>
              {option.get('list').map((list, i) => {
                return (
                  <div className="options-property" key={`property-${i}`}>
                    <div className="option-name">
                      <span>{`옵션속성 ${i + 1}`}</span>
                    </div>
                    <div className="option-input-name">
                      <input
                        type="text"
                        value={list.get('option_data')}
                        onChange={_onChangeOptionByKey(index, i, 'option_data')}
                      />
                    </div>
                    <div className="option-price">
                      <span>가격</span>
                    </div>
                    <div className="option-input-price">
                      <input
                        type="number"
                        value={list.get('price')}
                        onChange={_onChangeOptionByKey(index, i, 'price')}
                        onClick={e => e.target.select()}
                      />
                      <span>원</span>
                    </div>
                    <div
                      className={cx('option-input-control', {
                        first: option.get('list').size === 1 ? true : false,
                        plus: option.get('list').size - 1 === i ? true : false,
                      })}>
                      <span id="minus" onClick={_onDeleteProperty(index, i)}>
                        <img src="/img/minus.png" />
                      </span>
                      <span id="plus" onClick={_onAddProperty(index)}>
                        <img src="/img/plus.png" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="btn-add-option">
          <span onClick={_onAddOption}>+ 옵션 추가</span>
        </div>
      </div>
    );
  }
}

export default OptionWrapper;
