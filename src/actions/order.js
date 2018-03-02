import {
  apiGetOrderLists,
  apiGetOrderDetail,
  apiGetOrderProcess,
  apiSetOrderProcess,
  apiGetOrderComplete,
  apiSetOrderComplete,
  apiSetDeliveryProcess,
  apiSetOrderCancel,
  apiFetchOrderMore,
} from '../api/order';
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
const fetchOrderListsSuccess = (lists, pages) => ({
  type: 'order/FETCH_ORDER_LISTS_SUCCESS',
  lists,
  pages,
});
const fetchOrderListsError = errors => ({ type: 'order/FETCH_ORDER_LISTS_ERROR', errors });

export const initFetchOrderLists = payload => async dispatch => {
  dispatch(fetchOrderLists());

  try {
    const response = await apiGetOrderLists(payload);

    if (!response) {
      dispatch(fetchOrderListsError(error));
    } else {
      dispatch(
        fetchOrderListsSuccess(Converter.listsToState(response.list, 'payDone'), {
          currentPage: parseInt(response.curPage, 10),
          maxPage: response.maxPage,
        })
      );
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
const fetchOrderProcessSuccess = (payload, pages) => ({
  type: 'order/FETCH_ORDER_PROCESS_SUCCESS',
  payload,
  pages,
});
const fetchOrderProcessError = error => ({ type: 'order/FETCH_ORDER_PROCESS_ERROR', error });

export const initFetchOrderProcess = payload => async dispatch => {
  dispatch(fetchOrderProcess());

  const response = await apiGetOrderProcess(payload);

  try {
    if (!response) {
      dispatch(fetchOrderProcessError(error));
    } else {
      dispatch(
        fetchOrderProcessSuccess(Converter.listsToState(response.list), {
          currentPage: parseInt(response.curPage, 10),
          maxPage: response.maxPage,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문 처리중으로 설정
 */
const setOrderProcess = () => ({ type: 'order/SET_ORDER_PROCESS' });
const setOrderProcessSuccess = payload => ({ type: 'order/SET_ORDER_PROCESS_SUCCESS', payload });
const setOrderProcessError = error => ({ type: 'order/SET_ORDER_PROCESS_ERROR', error });

export const initSetOrderProcess = payload => async dispatch => {
  dispatch(setOrderProcess());

  const response = await apiSetOrderProcess(payload);

  try {
    if (!response) {
      dispatch(setOrderProcessError(error));
    } else {
      dispatch(setOrderProcessSuccess({ success: true }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문 처리 완료 목록
 */
const fetchProcessDone = () => ({ type: 'order/FETCH_PROCESS_DONE' });
const fetchProcessDoneSuccess = (payload, pages) => ({
  type: 'order/FETCH_PROCESS_DONE_SUCCESS',
  payload,
  pages,
});
const fetchProcessDoneError = errors => ({ type: 'order/FETCH_PROCESS_DONE_ERROR', errors });

export const initFetchProcessDone = payload => async dispatch => {
  dispatch(fetchProcessDone());

  const response = await apiGetOrderComplete(payload);

  try {
    if (!response) {
      dispatch(fetchProcessDoneError(error));
    } else {
      dispatch(
        fetchProcessDoneSuccess(Converter.listsToState(response.list), {
          currentPage: parseInt(response.curPage, 10),
          maxPage: response.maxPage,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문완료로 설정
 */
const setOrderComplete = () => ({ type: 'order/SET_ORDER_COMPLETE' });
const setOrderCompleteSuccess = payload => ({ type: 'order/SET_ORDER_COMPLETE_SUCCESS', payload });
const setOrderCompleteError = error => ({ type: 'order/SET_ORDER_COMPLETE_ERROR', error });

export const initSetOrderComplete = payload => async dispatch => {
  dispatch(setOrderProcess());

  const response = await apiSetOrderComplete(payload);

  try {
    if (!response) {
      dispatch(setOrderProcessError(error));
    } else {
      dispatch(setOrderProcessSuccess({ success: true }));
    }
  } catch (error) {
    console.error(error);
  }
};

const setDeliveryProcess = () => ({ type: 'order/SET_DELIVERY_PROCESS' });
const setDeliveryProcessSucess = payload => ({
  type: 'order/SET_DELIVERY_PROCESS_SUCCESS',
  payload,
});
const setDeliveryProcessError = error => ({ type: 'order/SET_DELIVERY_PROCESS_ERROR', error });

export const initSetDeliveryProcess = payload => async dispatch => {
  dispatch(setDeliveryProcess());

  const response = await apiSetDeliveryProcess(payload);

  try {
    if (!response) {
      dispatch(setDeliveryProcessError(error));
    } else {
      dispatch(setDeliveryProcessSucess({ success: true }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 주문을 거절함...
 */
const setOrderCancel = () => ({ type: 'order/SET_ORDER_CANCEL' });
const setOrderCancelSuccess = payload => ({ type: 'order/SET_ORDER_CANCEL_SUCCESS', payload });
const setOrderCancelError = error => ({ type: 'order/SET_ORDER_CANCEL_ERROR', error });

export const initSetOrderCancel = payload => async dispatch => {
  dispatch(setOrderCancel());

  const response = await apiSetOrderCancel(payload);

  try {
    if (!response) {
      dispatch(setOrderCancelError(error));
    } else {
      dispatch(setOrderCancelSuccess({ success: true }));
    }
  } catch (error) {
    console.error(error);
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

/**
 * 주문 더 불러오기
 */
const getOrderMore = () => ({ type: 'order/GET_ORDER_MORE' });
const getOrderMoreSuccess = (payload, pages) => ({
  type: 'order/GET_ORDER_MORE_SUCCESS',
  payload,
  pages,
});
const getOrderMoreError = error => ({ type: 'order/GET_ORDER_MORE_ERROR', error });

export const fetchOrderMore = payload => async dispatch => {
  dispatch(getOrderMore());

  const response = await apiFetchOrderMore(payload);

  try {
    if (!response) {
      dispatch(getOrderMoreError({ error: true }));
    } else {
      dispatch(
        getOrderMoreSuccess(
          {
            lists: Converter.listsToState(response.list),
            type: payload.type,
          },
          {
            currentPage: parseInt(response.curPage, 10),
            maxPage: response.maxPage,
          }
        )
      );
    }
  } catch (error) {
    console.error(error);
  }
};
