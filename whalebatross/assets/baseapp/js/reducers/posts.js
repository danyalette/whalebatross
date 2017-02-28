import {
  RECEIVE_POSTS, REQUEST_POSTS,
  RECEIVE_POST, REQUEST_POST
} from 'actions/posts'

const INITIAL_POSTS_STATE = {
  isFetching: false,
  data: []
}

const INITIAL_POST_STATE = {
  isFetching: false
}

function postsReducer(action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        isFetching: false,
        data: action.posts
      }
    default:
      return state
  }
}

function postReducer(state = INITIAL_POST_STATE, action) {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        isFetching: true,
        slug: action.slug
      }
    case RECEIVE_POST:
      return {
        ...state,
        isFetching: false,
        ...action.post
      }
    default:
      return state
  }
}

export function posts(state = INITIAL_POSTS_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        ...postsReducer(action)
      }
    case REQUEST_POST:
    case RECEIVE_POST:
      const index = state.data.findIndex(item => item.slug === action.slug);
      let data = state.data.slice(0);
      if (index < 0) data = data.concat([ postReducer(state.data[index], action) ]);
      else data = [
        ...state.data.slice(0, index),
        postReducer(state.data[index], action),
        ...state.data.slice(index + 1)
      ]
      return {
        ...state,
        data: data
      }
    default:
      return state
  }
}