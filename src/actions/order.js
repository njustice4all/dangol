import { orderLists, orderDetail, orderDoneLists } from '../dummy';

const error = { error: true, msg: '망함' };

export const batchActions = (...actions) => ({
  type: 'BATCH_ACTIONS',
  actions: actions,
});

export const setStatus = payloads => ({
  type: 'order/SET_STATUS',
  payloads,
});

/**
 * 주문접수 목록 가져옴
 */
const fetchOrderLists = () => ({
  type: 'order/FETCH_ORDER_LISTS',
});

const fetchOrderListsSuccess = lists => ({
  type: 'order/FETCH_ORDER_LISTS_SUCCESS',
  lists,
});

const fetchOrderListsError = errors => ({
  type: 'order/FETCH_ORDER_LISTS_ERROR',
  errors,
});

export const initFetchOrderLists = () => async dispatch => {
  dispatch(fetchOrderLists());

  // TODO:
  if (true) {
    dispatch(fetchOrderListsSuccess(orderLists));
  } else {
    dispatch(fetchOrderListsError(error));
  }
};

/**
 * 단일주문 상세
 */
const fetchOrderDetail = () => ({
  type: 'order/FETCH_ORDER_DETAIL',
});

const fetchOrderDetailSuccess = order => ({
  type: 'order/FETCH_ORDER_DETAIL_SUCCESS',
  order,
});

const fetchOrderDetailError = errors => ({
  type: 'order/FETCH_ORDER_DETAIL_ERROR',
  errors,
});

export const initFetchOrderDetail = no => async dispatch => {
  dispatch(fetchOrderDetail());
  // TODO: implements request api by no
  // ex) const response = await apiOrderDetail(no);
  if (true) {
    dispatch(fetchOrderDetailSuccess(orderDetail));
  } else {
    dispatch(fetchOrderDetailError(error));
  }
};

const fetchProcessDone = () => ({
  type: 'order/FETCH_PROCESS_DONE',
});

const fetchProcessDoneSuccess = lists => ({
  type: 'order/FETCH_PROCESS_DONE_SUCCESS',
  lists,
});

const fetchProcessDoneError = errors => ({
  type: 'order/FETCH_PROCESS_DONE_ERROR',
  errors,
});

export const initFetchProcessDone = () => async dispatch => {
  dispatch(fetchProcessDone());

  // TODO:
  if (true) {
    dispatch(fetchProcessDoneSuccess(orderDoneLists));
  } else {
    dispatch(fetchProcessDoneError(error));
  }
};
