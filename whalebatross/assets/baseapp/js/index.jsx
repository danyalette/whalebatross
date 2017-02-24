import React from 'react';
import { render } from 'react-dom';
import App from './app';
import Post from './components/post/post';
import PostFeed from './components/postfeed/postfeed';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import './styles/style.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PostFeed}/>
      <Route path="posts/:slug" component={Post}/>
    </Route>
  </Router>
), document.getElementById('react-app'))
