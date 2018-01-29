import { Record, Map, fromJS } from 'immutable';

const StateRecord = Record({
  name: '',
  address: '',
  token: '',
  coords: new Map({
    lat: '',
    lng: '',
  }),
  isFetching: false,
  status: new Map({
    login: false,
    error: false,
    msg: '',
  }),
});

const getInfo = (state, action) => {
  const info = fromJS(action.info);
  return state.withMutations(s =>
    s
      .merge(info)
      .set('isFetching', false)
      .setIn(['status', 'login'], true)
  );
};

// geo정보까지 가져와야 로그인라우터 변경할것인가?
const setCoords = (state, action) => {
  const coords = fromJS(action.coords);
  return state.withMutations(s => s.set('coords', coords).set('isFetching', false));
};

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg, login: false });
  return state.withMutations(s => s.set('isFetching', false).set('status', errors));
};

export const auth = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'auth/REQ_SIGNIN':
    case 'geo/GET_COORDS':
      return state.set('isFetching', true);
    case 'auth/REQ_SIGNIN_SUCCESS':
      return getInfo(state, action);
    case 'geo/GET_COORDS_SUCCESS':
      return setCoords(state, action);
    case 'auth/REQ_SIGNIN_ERROR':
    case 'geo/GET_COORDS_ERROR':
      return errorOnFetching(state, action);
    case 'auth/LOGOUT':
      return state.setIn(['status', 'login'], false);
    case 'auth/AUTO_LOGIN':
      return state;
    default:
      return state;
  }
};
