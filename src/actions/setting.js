import { apiGetPauseOrder, apiSetPauseOrder } from '../api/order';

export const initGetPauseOrder = payload => async dispatch => {
  const response = await apiGetPauseOrder(payload);

  try {
    if (!response) {
      console.error('error');
    } else {
      dispatch({ type: 'setting/GET_ORDER_PAUSE', payload: response.list });
    }
  } catch (error) {
    console.error(error);
  }
};

export const initSetPauseOrder = payload => async dispatch => {
  const response = await apiSetPauseOrder(payload);

  try {
    if (!response) {
      console.error('error');
    } else {
      dispatch({ type: 'setting/SET_ORDER_PAUSE', payload });
    }
  } catch (error) {
    console.error(error);
  }
};
