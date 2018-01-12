import { info } from '../dummy';

const errors = { error: true, msg: '망함' };

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
  if (false) {
    dispatch(reqSigninSuccess(info));
  } else {
    dispatch(reqSigninError(errors));
  }
};
