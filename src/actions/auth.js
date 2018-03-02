import { info } from '../dummy';
import apiGetCoords from '../api/coords';
import { apiReqLogin } from '../api/auth';

import { initGetManagers } from './ceo';

const errors = { error: true, msg: '망함' };

/**
 * gps좌표로 주소가져옴, 구글 api사용
 */
const getCoords = () => ({ type: 'geo/GET_COORDS' });
const getCoordsSuccess = coords => ({ type: 'geo/GET_COORDS_SUCCESS', coords });
const getCoordsError = erros => ({ type: 'geo/GET_COORDS_ERROR', errors });

export const initGetCoords = info => async dispatch => {
  dispatch(getCoords());
  const response = await apiGetCoords(info);

  if (response.status === 200) {
    const result = await response.json();
    dispatch(getCoordsSuccess(result.results[0].geometry.location));
  } else {
    dispatch(getCoordsError(errors));
  }
};

/**
 * 로그인
 */
const reqSignin = () => ({ type: 'auth/REQ_SIGNIN' });
const reqSigninSuccess = (info, user) => ({ type: 'auth/REQ_SIGNIN_SUCCESS', info, user });
const reqSigninError = errors => ({ type: 'auth/REQ_SIGNIN_ERROR', errors });

export const initSignin = user => async dispatch => {
  dispatch(reqSignin());

  const response = await apiReqLogin(user);
  const result = JSON.parse(response);

  try {
    if (result.msg !== 'ok') {
      dispatch(reqSigninError(errors));
      return { redirect: false };
    } else {
      dispatch(reqSigninSuccess({ ...result }, user));
      dispatch(initGetCoords(info));
      /**
       * FIXME:
       * autologin하고 업소정보수정 페이지 방문후 업소 부관리자 페이지 방문하면 안나오는거 방지함
       * diff secret이라고 나옴
       * webview에서 동일 secret날리는거 확인했음
       */
      dispatch(initGetManagers({ id: user.id, secret: result.secret }));

      if (user.autoLogin) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      if (result.first === '1') {
        return { redirect: true, role: result.role };
      }
      return { redirect: false };
    }
  } catch (error) {
    console.error(error);
  }
};
