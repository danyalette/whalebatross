import { apiAuth, apiGet } from 'utils';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function getPosts(username, password) {
  return dispatch => {
    dispatch(requestPosts())
    return apiGet('/api/posts/')
      .then(response => dispatch(receivePosts(response.results)))
  }
}