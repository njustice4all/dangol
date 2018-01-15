import { Record, List, Map, fromJS } from 'immutable';

const StateRecord = Record({
  lists: new List(),
  detail: new Map({
    order: new Map({
      no: '',
      type: '',
      date: '',
      paymentMethod: '',
      totalPay: 0,
      status: 'pending',
      options: '',
    }),
    customer: new Map({
      phone: '',
      address: '',
      request: '',
    }),
    products: new List(),
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

export const order = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'order/FETCH_ORDER_LISTS':
    case 'order/FETCH_ORDER_DETAIL':
      return state.set('isFetching', true);
    case 'order/FETCH_ORDER_LISTS_SUCCESS':
      return getNewLists(state, action);
    case 'order/FETCH_ORDER_DETAIL_SUCCESS':
      return state.set('detail', fromJS(action.order));
    case 'order/FETCH_ORDER_LISTS_ERROR':
    case 'order/FETCH_ORDER_DETAIL_ERROR':
      return errorOnFetching(state, action);
    default:
      return state;
  }
};
