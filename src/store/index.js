import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from '../reducers';

// redux-thunk를 사용하지 않을때 batch action 처리
function enableBatching(reducers) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(batchingReducer, state);
      default:
        return reducers(state, action);
    }
  };
}

// logger option
const logger = createLogger({ collapsed: true });

// for redux-router history
export const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

// action to mobile app
const watchWebActions = store => next => action => {
  // TODO: 마음에안듬...
  // sign success만 delay줄것인가? 아니면 다른 해결책이 있나
  setTimeout(() => {
    window.postMessage(
      JSON.stringify({
        type: 'redux/action',
        payload: action,
      }),
      '*'
    );
  }, 300);
  return next(action);
};

const middlewares = [thunk, watchWebActions, reduxRouterMiddleware];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(logger);
}

export default createStore(
  enableBatching(reducers),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
