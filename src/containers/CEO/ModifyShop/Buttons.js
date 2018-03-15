// @flow

import React from 'react';
import classNames from 'classnames';

import getMobileOperatingSystem from '../../../utils/getMobileOperatingSystem';

type Props = {
  handleConfirm: () => void,
  handleCancel: () => void,
  errors: boolean,
  editMode: boolean,
};

const Buttons = ({ handleConfirm, handleCancel, errors, editMode }: Props) => {
  return (
    <div>
      <div className="survay__btn__confirm__wrapper">
        {getMobileOperatingSystem() === 'android' ? null : (
          <div className="buttons" onClick={handleCancel}>
            취소하기
          </div>
        )}
        <div className={classNames('buttons update')} onClick={handleConfirm}>
          {editMode ? '수정하기' : '등록하기'}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
