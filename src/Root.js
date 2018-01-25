import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './containers/App';
import ScrollToTop from './ScrollToTop';

import { history } from './store';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    );
  }
}
