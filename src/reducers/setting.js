import { Record, Map, List } from 'immutable';

const StateRecord = Record({
  info: Map(),
  management: Map({
    managers: List(),
  }),
  delivery: Map({
    isStop: false,
    time: Map({
      start: '11:00',
      end: '21:00',
    }),
  }),
  statistics: Map(),
  version: '1.0',
  alarm: 'default',
});

const _setDeliveryStop = (state, action) => {
  return state.merge({ delivery: Map(action.delivery) });
};

export const setting = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'setting/SET_DELIVERY_STOP':
      return _setDeliveryStop(state, action);
    default:
      return state;
  }
};
