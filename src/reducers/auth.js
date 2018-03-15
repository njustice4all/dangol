import { Record, Map, fromJS } from 'immutable';

const StateRecord = Record({
  id: '',
  address: '',
  token: '',
  session: '',
  secret: '',
  siteId: '',
  siteName: '',
  siteUserId: '',
  role: 'ceo',
  first: '1',
  topic: '',
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
  return state.withMutations(mutator =>
    mutator
      .set('secret', action.info.secret)
      .set('role', action.info.role)
      .set('first', action.info.first)
      .set('session', action.info.sessId)
      .set('siteId', action.info.siteId)
      .set('id', action.user.id.toLowerCase())
      .set('siteName', action.info.siteName)
      .set('siteUserId', action.info.siteUserId)
      .set('topic', action.info.topic)
      .set('isFetching', false)
      .setIn(['status', 'login'], true)
  );
};

const setAuthFromMobile = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .set('secret', action.payload.secret)
      .set('role', action.payload.role)
      .set('first', action.payload.first)
      .set('session', action.payload.sessId)
      .set('siteId', action.payload.siteId)
      // .set('id', action.user.id)
      .set('siteName', action.payload.siteName)
      .set('siteUserId', action.payload.siteUserId)
      .set('topic', action.info.topic)
      .set('isFetching', false)
      .setIn(['status', 'login'], true)
  );
};

// TODO: geo정보까지 가져와야 로그인라우터 변경할것인가?
const setCoords = (state, action) => {
  const coords = fromJS(action.coords);
  return state.withMutations(mutator => mutator.set('coords', coords).set('isFetching', false));
};

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg, login: false });
  return state.withMutations(mutator => mutator.set('isFetching', false).set('status', errors));
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
      localStorage.clear();
      return new StateRecord();
    case 'auth/AUTO_LOGIN':
      console.log('need auto login');
      return state;
    case 'auth/SET_AUTH_FROM_MOBILE':
      return setAuthFromMobile(state, action);
    case 'auth/SET_FIRST':
      return state.set('first', '0');
    case 'auth/SET_REQUIRED':
      return state
        .set('siteId', action.payload.siteId)
        .set('siteUserId', action.payload.userId)
        .set('session', action.payload.session);
    default:
      return state;
  }
};
