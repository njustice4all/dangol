import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import { order } from './order';
import { auth } from './auth';
import { ui } from './ui';
import { setting } from './setting';

export default combineReducers({
  router: routerReducer,
  order,
  auth,
  ui,
  setting,
});
