import { apiGet, apiPost, apiPostForm } from 'utils';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';

function receivePosts(page, posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts,
    page: page
  }
}

function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post: post
  }
}

export function getPosts(page) {
  return dispatch => {
    return apiGet('/api/posts/?page=' + page)
      .then(response => dispatch(receivePosts(page, response)))
  }
}

export function getPost(slug) {
  return dispatch => {
    return apiGet('/api/posts/' + slug + '/')
      .then(data => dispatch(receivePost(data)))
  }
}

export function createPost(post) {
  return dispatch => {
    return apiPostForm('/api/posts/', post)
      .then(data => {
        dispatch(receivePost(data.slug, data))
      })
  }
}