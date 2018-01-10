import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

// logger option
const logger = createLogger({ collapsed: true });

const middlewares = [thunk];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(logger);
}

export default createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
