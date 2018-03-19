import { Record, Map, List } from 'immutable';

const StateRecord = Record({
  info: Map(),
  push: true,
  management: Map({
    managers: List(),
  }),
  delivery: Map({
    isStop: false,
    time: Map({
      start: '',
      end: '',
    }),
  }),
  statistics: Map(),
  version: '0.1',
  alarm: 'default',
});

const _setDeliveryStop = (state, action) => {
  return state.merge({ delivery: Map(action.delivery) });
};

const getOrderPause = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .setIn(['delivery', 'isStop'], action.payload.deliveryStopFlag === '1' ? true : false)
      .setIn(['delivery', 'time', 'start'], action.payload.deliveryStopStart)
      .setIn(['delivery', 'time', 'end'], action.payload.deliveryStopEnd)
  );
};

const setOrderPause = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .setIn(['delivery', 'isStop'], action.payload.data.deliveryStopFlag === '1' ? true : false)
      .setIn(['delivery', 'time', 'start'], action.payload.data.deliveryStopStart)
      .setIn(['delivery', 'time', 'end'], action.payload.data.deliveryStopEnd)
  );
};

export const setting = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'setting/SET_DELIVERY_STOP':
      return _setDeliveryStop(state, action);
    case 'setting/GET_ORDER_PAUSE':
      return getOrderPause(state, action);
    case 'setting/SET_ORDER_PAUSE':
      return setOrderPause(state, action);
    case 'setting/TOGGLE_PUSH':
      // try {
      //   if (localStorage.getItem('push')) {
      //     localStorage.removeItem('push');
      //   } else {
      //     localStorage.setItem('push', JSON.stringify(true));
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      return state.set('push', !state.get('push'));
    default:
      return state;
  }
};
