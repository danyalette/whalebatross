import {
  RECEIVE_USER, REQUEST_LOGIN
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
    case RECEIVE_USER:
      return {
        ...state,
        ...user(state[action.currentUser], action)
      }
    default:
      return state
  }
}