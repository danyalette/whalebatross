import { apiAuth } from 'utils';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';


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

export function logInUser(username, password) {
  return dispatch => {
    dispatch(requestLogIn(username))
    return apiAuth(username, password)
      .then(user => dispatch(receiveUser(user)))
  }
}