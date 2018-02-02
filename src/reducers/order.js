import { Record, List, Map, fromJS } from 'immutable';

const StateRecord = Record({
  lists: new List(),
  doneLists: new List(),
  detail: fromJS({
    order: {},
    orderDetail: {},
  }),
  isFetching: false,
  status: new Map({
    error: false,
    msg: '',
  }),
});

const getNewLists = (state, action) => {
  return state.withMutations(s => s.set('isFetching', false).set('lists', fromJS(action.lists)));
};

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg });
  return state.withMutations(s => s.set('isFetching', false).set('status', errors));
};

const _setStatus = (state, action) => {
  const payload = new Map({ status: action.payload.status, option: action.payload.option });
  return state.mergeIn(['detail', 'order'], payload);
};

const getDoneLists = (state, action) => {
  return state.withMutations(s =>
    s.set('isFetching', false).set('doneLists', fromJS(action.lists))
  );
};

const getOrderDetailSuccess = (state, action) => {
  return state.withMutations(mutator =>
    mutator.set('detail', fromJS(action.order)).set('isFetching', false)
  );
};

export const order = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'order/FETCH_ORDER_LISTS':
    case 'order/FETCH_ORDER_DETAIL':
    case 'order/FETCH_PROCESS_DONE':
      return state.set('isFetching', true);
    case 'order/FETCH_ORDER_LISTS_SUCCESS':
      return getNewLists(state, action);
    case 'order/FETCH_ORDER_DETAIL_SUCCESS':
      return getOrderDetailSuccess(state, action);
    case 'order/FETCH_PROCESS_DONE_SUCCESS':
      return getDoneLists(state, action);
    case 'order/FETCH_ORDER_LISTS_ERROR':
    case 'order/FETCH_ORDER_DETAIL_ERROR':
    case 'order/FETCH_PROCESS_DONE_ERROR':
      return errorOnFetching(state, action);
    case 'order/SET_STATUS':
      return _setStatus(state, action);
    default:
      return state;
  }
};
