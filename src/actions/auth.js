import { info } from '../dummy';
import apiGetCoords from '../api/coords';

const errors = { error: true, msg: '망함' };

const getCoords = () => ({
  type: 'geo/GET_COORDS',
});

const getCoordsSuccess = coords => ({
  type: 'geo/GET_COORDS_SUCCESS',
  coords,
});

const getCoordsError = erros => ({
  type: 'geo/GET_COORDS_ERROR',
  errors,
});

const initGetCoords = info => async dispatch => {
  dispatch(getCoords());
  const response = await apiGetCoords(info);

  if (response.status === 200) {
    const result = await response.json();
    dispatch(getCoordsSuccess(result.results[0].geometry.location));
  } else {
    dispatch(getCoordsError(erros));
  }
};

const reqSignin = () => ({
  type: 'auth/REQ_SIGNIN',
});

const reqSigninSuccess = info => ({
  type: 'auth/REQ_SIGNIN_SUCCESS',
  info,
});

const reqSigninError = errors => ({
  type: 'auth/REQ_SIGNIN_ERROR',
  errors,
});

export const initSignin = user => async dispatch => {
  dispatch(reqSignin());

  // TODO: const response = await apiSignin(user)
  if (true) {
    dispatch(reqSigninSuccess(info));
    dispatch(initGetCoords(info));
  } else {
    dispatch(reqSigninError(errors));
  }
};
