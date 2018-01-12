import { Record, Map, fromJS } from 'immutable';

const StateRecord = Record({
  name: '',
  address: '',
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

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg, login: false });
  return state.withMutations(s => s.set('isFetching', false).set('status', errors));
};

export const auth = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'auth/REQ_SIGNIN':
      return state.set('isFetching', true);
    case 'auth/REQ_SIGNIN_SUCCESS':
      return getInfo(state, action);
    case 'auth/REQ_SIGNIN_ERROR':
      return errorOnFetching(state, action);
    default:
      return state;
  }
};
