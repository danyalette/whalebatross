import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from 'configureStore';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import './styles/style.scss';

import App from './app';
import Post from './components/post/post';
import Home from './components/home/home';

const store = configureStore();

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="page/:page" component={Home}/>
        <Route path="posts/:slug" component={Post}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-app'))
