import {
  RECEIVE_POSTS, REQUEST_POSTS
} from 'actions/posts'

function post(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        data: action.posts
      }
    default:
      return state
  }
}

export function posts(state = { }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        ...post(state[action.posts], action)
      }
    default:
      return state
  }
}