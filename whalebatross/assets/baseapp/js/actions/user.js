import { apiAuth, apiLogout, fetchCurrentUser } from 'utils';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';


function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user
  }
}

function requestLogIn() {
  return {
    type: REQUEST_LOGIN
  }
}

function requestLogOut() {
  return {
    type: REQUEST_LOGOUT
  }
}

function requestCurrentUser() {
  return {
    type: REQUEST_CURRENT_USER
  }
}

export function getCurrentUser() {
  return dispatch => {
    dispatch(requestCurrentUser())
    return fetchCurrentUser()
      .then(user => dispatch(receiveUser(user)))
      .catch(() => dispatch(receiveUser(null)))
  }
}

export function logInUser(username, password) {
  return dispatch => {
    dispatch(requestLogIn(username))
    return apiAuth(username, password)
      .then(user => dispatch(receiveUser(user)))
  }
}

export function logOutUser() {
  return dispatch => {
    dispatch(requestLogOut())
    return apiLogout()
      .then(user => dispatch(receiveUser(null)))
  }
}