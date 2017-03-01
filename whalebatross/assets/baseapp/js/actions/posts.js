import { apiGet, apiPost } from 'utils';

export const BEGIN_GET_POSTS_REQUEST = 'BEGIN_GET_POSTS_REQUEST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const BEGIN_GET_POST_REQUEST = 'BEGIN_GET_POST_REQUEST';
export const BEGIN_CREATE_POST_REQUEST = 'BEGIN_CREATE_POST_REQUEST';
export const RECEIVE_POST = 'RECEIVE_POST';

export const BEGIN_DELETE_POST = 'BEGIN_DELETE_POST';
export const REMOVE_POST = 'REMOVE_POST';

// posts

function beginGetPosts() {
  return {
    type: BEGIN_GET_POSTS_REQUEST
  }
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  }
}

// get/create post

function beginGetPost(slug) {
  return {
    type: BEGIN_GET_POST_REQUEST,
    slug: slug
  }
}

function beginCreatePost(slug) {
  return {
    type: BEGIN_CREATE_POST_REQUEST,
    slug: slug
  }
}

function receivePost(slug, post) {
  return {
    type: RECEIVE_POST,
    slug: slug,
    post: post
  }
}

// delete post

function beginDeletePost(slug, post) {
  return {
    type: BEGIN_DELETE_POST,
    slug: slug
  }
}

function removePost(slug) {
  return {
    type: REMOVE_POST,
    slug: slug
  }
}

export function getPosts() {
  return dispatch => {
    dispatch(beginGetPosts())
    return apiGet('/api/posts/')
      .then(response => dispatch(receivePosts(response.results)))
  }
}

export function getPost(slug) {
  return dispatch => {
    dispatch(beginGetPost(slug))
    return apiGet('/api/posts/' + slug)
      .then(data => dispatch(receivePost(slug, data)))
  }
}

export function createPost(post) {
  return dispatch => {
    dispatch(beginCreatePost(post.slug))
    return apiPost('/api/posts/', post)
      .then(data => {

        dispatch(receivePost(post.slug, data))
      })
  }
}