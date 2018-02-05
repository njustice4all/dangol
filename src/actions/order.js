import { orderDoneLists } from '../dummy';

// real api
import { apiGetOrderLists, apiGetOrderDetail, apiGetOrderProcess } from '../api/order';
import apiGetCoords from '../api/coords';
import Converter from '../utils/Converter';

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
const fetchOrderLists = () => ({ type: 'order/FETCH_ORDER_LISTS' });
const fetchOrderListsSuccess = lists => ({ type: 'order/FETCH_ORDER_LISTS_SUCCESS', lists });
const fetchOrderListsError = errors => ({ type: 'order/FETCH_ORDER_LISTS_ERROR', errors });

export const initFetchOrderLists = payload => async dispatch => {
  dispatch(fetchOrderLists());

  try {
    const response = await apiGetOrderLists(payload);

    if (!response) {
      dispatch(fetchOrderListsError(error));
    } else {
      dispatch(fetchOrderListsSuccess(Converter.listsToState(response.list)));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 단일주문 상세페이지
 */
const fetchOrderDetail = () => ({ type: 'order/FETCH_ORDER_DETAIL' });
const fetchOrderDetailSuccess = order => ({ type: 'order/FETCH_ORDER_DETAIL_SUCCESS', order });
const fetchOrderDetailError = errors => ({ type: 'order/FETCH_ORDER_DETAIL_ERROR', errors });

export const initFetchOrderDetail = payload => async dispatch => {
  dispatch(fetchOrderDetail());

  const response = await apiGetOrderDetail(payload);

  try {
    if (!response) {
      dispatch(fetchOrderDetailError(error));
    } else {
      dispatch(fetchOrderDetailSuccess(Converter.getDetail(response)));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문 처리중 목록
 */
const fetchOrderProcess = () => ({ type: 'order/FETCH_ORDER_PROCESS' });
const fetchOrderProcessSuccess = payload => ({
  type: 'order/FETCH_ORDER_PROCESS_SUCCESS',
  payload,
});
const fetchOrderProcessError = error => ({ type: 'order/FETCH_ORDER_PROCESS_ERROR', error });

export const initFetchOrderProcess = () => async dispatch => {
  dispatch(fetchOrderProcess());

  const response = await apiGetOrderProcess();

  try {
    if (!response) {
      dispatch(fetchOrderProcessError(error));
    } else {
      dispatch(fetchOrderProcessSuccess([]));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문 처리 완료 목록
 */
const fetchProcessDone = () => ({ type: 'order/FETCH_PROCESS_DONE' });
const fetchProcessDoneSuccess = lists => ({ type: 'order/FETCH_PROCESS_DONE_SUCCESS', lists });
const fetchProcessDoneError = errors => ({ type: 'order/FETCH_PROCESS_DONE_ERROR', errors });

export const initFetchProcessDone = () => async dispatch => {
  dispatch(fetchProcessDone());

  // TODO:
  if (true) {
    dispatch(fetchProcessDoneSuccess(orderDoneLists));
  } else {
    dispatch(fetchProcessDoneError(error));
  }
};

/**
 * 주문자의 gps값 가져옴
 */
const getCoords = () => ({ type: 'order/GET_COORDS' });
const getCoordsSuccess = coords => ({ type: 'order/GET_COORDS_SUCCESS', coords });
const getCoordsError = errors => ({ type: 'order/GET_COORDS_ERROR', errors });

export const initGetCoords = info => async dispatch => {
  dispatch(getCoords());
  const response = await apiGetCoords(info);

  try {
    if (response.status !== 200) {
      dispatch(getCoordsError(error));
    } else {
      const result = await response.json();

      if (result.results.length === 0) {
        dispatch(getCoordsSuccess({ lat: '', lng: '' }));
      }

      dispatch(getCoordsSuccess(result.results[0].geometry.location));
    }
  } catch (error) {
    dispatch(getCoordsError(error));
  }
};
