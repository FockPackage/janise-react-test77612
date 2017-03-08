// import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';

import Index from './pages/Index';
import App from './pages/AppPage';
import PublicSentimentPage from './pages/PublicSentimentPage';
import CsPage from './pages/CsPage';

const store = configureStore();

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index}>
        {
          <IndexRoute component={PublicSentimentPage} />
        }
        <Route path="app" component={App} />
        <Route path="publicsentiment" component={PublicSentimentPage} />
        <Route path="cs" component={CsPage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

