import React from 'react';
import classNames from 'classnames';

const Info = ({
  toggleAddress,
  address,
  possible,
  name,
  contact,
  openingHours,
  closeDays,
  description,
  category,
  handleCheck,
  setStateByKey,
  handleDetailAddress,
  handleCategory,
  validateClass,
  id,
  setId,
  navigateTo,
  permitNumber,
  openDay,
}) => {
  return (
    <div className="items" style={{ padding: '5px 8px', marginTop: '10px' }}>
      <h5 className="title__big">가맹점 정보</h5>
      <div className="info__wrapper">
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('description') })}>
            아이디
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="text"
              className="default__form"
              value="aty001"
              disabled
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('category') })}>
            분류
          </div>
          <div className="input__content" style={{ height: '35px' }}>
            <select
              value={category}
              onChange={e => handleCategory(e.target.value)}
              style={{ borderRadius: '0px', backgroundColor: 'white', paddingLeft: '5px' }}>
              <option default>카페/한식/중식/일식....</option>
              <option value="cafe">카페</option>
              <option value="korean">한식</option>
              <option value="chinese">중식</option>
              <option value="japanese">일식</option>
              <option value="snack">분식</option>
              <option value="bakery">베이커리</option>
              <option value="restaurant">레스토랑</option>
              <option value="midnightSnack">야식</option>
              <option value="chicken">치킨</option>
              <option value="pizza">피자</option>
              <option value="meat">육류</option>
              <option value="etc">기타</option>
            </select>
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('name') })}>
            가맹점명
          </div>
          <div className="input__content" style={{ height: '35px' }}>
            <input
              type="text"
              style={{ height: '100%' }}
              className="input__content__field"
              // placeholder="가게 이름을 입력하세요"
              value={name}
              onChange={e => setStateByKey('name', e.target.value)}
            />
          </div>
        </div>
        <div className="input__box">
          <div
            className={classNames('input__title', { wrong: validateClass('description') })}
            style={{ verticalAlign: 'top' }}>
            가맹점소개
          </div>
          <div className="input__content">
            <textarea
              className="input__content__field"
              style={{ border: '1px solid #dfdfdf', resize: 'none' }}
              rows="4"
              value={description}
              placeholder="사장님 가맹점만의 특별한 매력을 소개해주세요"
              onChange={e => setStateByKey('description', e.target.value)}
            />
          </div>
        </div>
        <div className="input__box" style={{ paddingTop: '0px' }}>
          <div
            className={classNames('input__title', { wrong: validateClass('address') })}
            style={{ verticalAlign: 'top', paddingTop: '5px' }}>
            주소
          </div>
          <div className="input__content">
            <div>
              <input className="address__zipcode" value={address.get('zipCode')} disabled />
              <span className="address__zipcode zipcode__btn" onClick={toggleAddress}>
                우편번호검색
              </span>
            </div>
            <input
              className="default__form"
              value={address.get('firstAddress')}
              placeholder="기본주소"
              disabled
            />
            <input
              type="text"
              className="default__form"
              placeholder="나머지주소"
              value={address.get('detailAddress')}
              onChange={e => handleDetailAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('contact') })}>
            전화번호
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="number"
              placeholder=" - 제외하고 입력"
              className="default__form"
              onChange={e => setStateByKey('contact', e.target.value)}
              value={contact}
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('contact') })}>
            영업일
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="text"
              placeholder="영업일을 입력하세요"
              className="default__form"
              onChange={e => setStateByKey('openDay', e.target.value)}
              value={openDay}
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('contact') })}>
            사업자번호
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="text"
              placeholder="사업자등록번호를 입력하세요"
              className="default__form"
              onChange={e => setStateByKey('permitNumber', e.target.value)}
              value={permitNumber}
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('openingHours') })}>
            영업시간
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="text"
              placeholder="평일 11:00 ~ 22:00 / 일요일 11:30 ~ 22:30"
              className="default__form"
              onChange={e => setStateByKey('openingHours', e.target.value)}
              value={openingHours}
            />
          </div>
        </div>
        <div className="input__box">
          <div className={classNames('input__title', { wrong: validateClass('closeDays') })}>
            휴무일
          </div>
          <div className="input__content">
            <input
              style={{ margin: '0' }}
              type="text"
              placeholder="연중무휴 / 일요일휴무"
              className="default__form"
              onChange={e => setStateByKey('closeDays', e.target.value)}
              value={closeDays}
            />
          </div>
        </div>
        <div className="input__box">
          <div
            className={classNames('input__title', { wrong: validateClass('possible') })}
            style={{ verticalAlign: 'top' }}>
            가능여부
          </div>
          <div className="input__content">
            <div className="possible__wrapper">
              {possible.map((value, i) => {
                return (
                  <div
                    key={`icon-${i}`}
                    className={classNames('possible__icon', {
                      active: value.get('isChecked'),
                    })}
                    onClick={() => handleCheck(value.get('index'))}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <img
                        src={`${value.get('src')}${value.get('isChecked') ? '_on' : ''}.png`}
                        alt=""
                      />
                      <p style={{ textAlign: 'center', fontSize: '12px' }}>{value.get('title')}</p>
                    </div>
                    <span
                      className={classNames('selected-circle', { on: value.get('isChecked') })}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="input__box" style={{ marginTop: '20px' }}>
          <div className="input__title" />
          <div className="input__content">
            <div className="input-register-menu">
              <div className="input-register-items" onClick={navigateTo('/ceo/terms/use')}>
                <span>약관 및 개인정보 수정</span>
              </div>
              <div className="input-register-items">가맹점 사장님 ID 등록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
