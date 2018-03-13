import { Record, List, Map, fromJS } from 'immutable';

const StateRecord = Record({
  lists: new List(),
  doneLists: new List(),
  processLists: List(),
  detail: List(),
  // detail: fromJS({
  //   order: {},
  //   orderDetail: {},
  //   process: 'pending',
  //   option: '',
  // }),
  coords: {
    lat: null,
    lng: null,
  },
  isFetching: false,
  status: new Map({
    error: false,
    msg: '',
  }),
  orderListsObj: {
    maxPage: '',
    currentPage: '',
  },
  processListsObj: {
    maxPage: '',
    currentPage: '',
  },
  doneListsObj: {
    maxPage: '',
    currentPage: '',
  },
});

const getNewLists = (state, action) => {
  const pages = fromJS(action.pages);
  return state.withMutations(mutator =>
    mutator
      .set('isFetching', false)
      .set('lists', fromJS(action.lists))
      .set('orderListsObj', pages)
  );
};

const getProcessLists = (state, action) => {
  const pages = fromJS(action.pages);
  return state.withMutations(mutator =>
    mutator
      .set('isFetching', false)
      .set('processLists', fromJS(action.payload))
      .set('processListsObj', pages)
  );
};

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg });
  return state.withMutations(s => s.set('isFetching', false).set('status', errors));
};

const _setStatus = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .setIn(['detail', 'process'], fromJS(action.payloads.status))
      .setIn(['detail', 'option'], fromJS(action.payloads.option))
  );
};

const getDoneLists = (state, action) => {
  const pages = fromJS(action.pages);
  return state.withMutations(mutator =>
    mutator
      .set('isFetching', false)
      .set('doneLists', fromJS(action.payload))
      .set('doneListsObj', pages)
  );
};

const getOrderDetailSuccess = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      // .setIn(['detail', 'order'], fromJS(action.order.order))
      // .setIn(['detail', 'orderDetail'], fromJS(action.order.orderDetail))
      .set('detail', fromJS(action.order))
      .set('isFetching', false)
  );
};

const setCoords = (state, action) => {
  const coords = fromJS(action.coords);
  return state.withMutations(mutator => mutator.set('coords', coords).set('isFetching', false));
};

const fetchOrderMore = (state, action) => {
  const pages = fromJS(action.pages);
  const more = fromJS(action.payload.lists);

  if (action.payload.type.includes('deliveryDone')) {
    // 주문완료
    return state.withMutations(mutator =>
      mutator
        .update('doneLists', doneLists => doneLists.push(...more))
        .set('doneListsObj', pages)
        .set('isFetching', false)
    );
  } else if (action.payload.type.includes('deliveryPrepare')) {
    // 진행중
    return state.withMutations(mutator =>
      mutator
        .update('processLists', processLists => processLists.push(...more))
        .set('processListsObj', pages)
        .set('isFetching', false)
    );
  } else {
    // 주문대기
    return state.withMutations(mutator =>
      mutator
        .update('lists', orderLists => orderLists.push(...more))
        .set('orderListsObj', pages)
        .set('isFetching', false)
    );
  }
};

export const order = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'order/FETCH_ORDER_LISTS':
    case 'order/FETCH_ORDER_DETAIL':
    case 'order/FETCH_PROCESS_DONE':
    case 'order/FETCH_ORDER_PROCESS':
    case 'order/SET_ORDER_PROCESS':
    case 'order/SET_ORDER_COMPLETE':
    case 'order/SET_DELIVERY_PROCESS':
    case 'order/GET_COORDS':
    case 'order/GET_ORDER_MORE':
      return state.set('isFetching', true);

    case 'order/FETCH_ORDER_LISTS_SUCCESS':
      return getNewLists(state, action);

    case 'order/FETCH_ORDER_DETAIL_SUCCESS':
      return getOrderDetailSuccess(state, action);

    case 'order/FETCH_ORDER_PROCESS_SUCCESS':
      return getProcessLists(state, action);

    case 'order/FETCH_PROCESS_DONE_SUCCESS':
      return getDoneLists(state, action);

    case 'order/GET_COORDS_SUCCESS':
      return setCoords(state, action);

    case 'order/SET_ORDER_PROCESS_SUCCESS':
      return state;

    case 'order/SET_ORDER_COMPLETE_SUCCESS':
      return state;

    case 'order/SET_DELIVERY_PROCESS_SUCCESS':
      return state;

    case 'order/GET_ORDER_MORE_SUCCESS':
      return fetchOrderMore(state, action);

    case 'order/FETCH_ORDER_LISTS_ERROR':
    case 'order/FETCH_ORDER_DETAIL_ERROR':
    case 'order/FETCH_PROCESS_DONE_ERROR':
    case 'order/FETCH_ORDER_PROCESS_ERROR':
    case 'order/SET_ORDER_PROCESS_ERROR':
    case 'order/SET_ORDER_COMPLETE_ERROR':
    case 'order/SET_DELIVERY_PROCESS_ERROR':
    case 'order/GET_COORDS_ERROR':
    case 'order/GET_ORDER_MORE_ERROR':
      return errorOnFetching(state, action);

    case 'order/SET_STATUS':
      return _setStatus(state, action);

    default:
      return state;
  }
};
