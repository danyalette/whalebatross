import { combineReducers } from 'redux'
import {
  RECEIVE_USER, REQUEST_LOGIN
} from 'actions/actions'

function user(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, action.user, {
        isFetching: false,
        user: action.user
      })
    default:
      return state
  }
}

function currentUser(state = { }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
    case RECEIVE_USER:
      return Object.assign({}, state,
        user(state[action.currentUser], action)
      )
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentUser
})

export default rootReducer