import { combineReducers } from 'redux-immutable';

import routes from './routes';
import { order } from './order';

export default combineReducers({
  routes,
  order,
});
