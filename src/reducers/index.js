import { combineReducers } from 'redux-immutable';

import routes from './routes';
import { order } from './order';
import { auth } from './auth';
import { ui } from './ui';
import { setting } from './setting';

export default combineReducers({
  routes,
  order,
  auth,
  ui,
  setting,
});
