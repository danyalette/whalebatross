import {
  RECEIVE_USER, REQUEST_LOGIN, REQUEST_CURRENT_USER
} from 'actions/user'

function user(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_CURRENT_USER:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        data: action.user
      }
    default:
      return state
  }
}

export function currentUser(state = { }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_CURRENT_USER:
    case RECEIVE_USER:
      return {
        ...state,
        ...user(state[action.currentUser], action)
      }
    default:
      return state
  }
}