import { apiAuth, apiGet } from 'utils';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

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

function receivePost(slug, post) {
  return {
    type: RECEIVE_POST,
    slug: slug,
    post: post
  }
}

function requestPost(slug) {
  return {
    type: REQUEST_POST,
    slug: slug
  }
}

export function getPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return apiGet('/api/posts/')
      .then(response => dispatch(receivePosts(response.results)))
  }
}

export function getPost(slug) {
  return dispatch => {
    dispatch(requestPost(slug))
    return apiGet('/api/posts/' + slug)
      .then(data => dispatch(receivePost(slug, data)))
  }
}