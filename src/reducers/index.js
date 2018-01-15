import { combineReducers } from 'redux-immutable';

import routes from './routes';
import { order } from './order';
import { auth } from './auth';
import { ui } from './ui';

export default combineReducers({
  routes,
  order,
  auth,
  ui,
});
