/*
 *
 * Login actions
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASS,
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_FAILED,
  CHANGE_IS_OPEN,
} from './constants';

// const targetUrl = '/api/auth/login';

export function login(value) {
  return {
    type: LOGGING_IN,
    value,
  };
  // return function action(dispatch) {
  // dispatch({ type: })
  // return async () => {
  //   const res = fetch(targetUrl, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   console.log(res);
  //   const { token } = res.data;
  //   localStorage.setItem('jwtToken', token);
  // };
}

export function loginSuccess(value) {
  return {
    type: LOGGED_IN,
    value,
  };
}

export function loginError(value) {
  return {
    type: LOGIN_FAILED,
    value,
  };
}

export function changeEmail(value) {
  return {
    type: CHANGE_EMAIL,
    value,
  };
}

export function changePass(value) {
  return {
    type: CHANGE_PASS,
    value,
  };
}

export function changeIsOpen(value, body) {
  return {
    type: CHANGE_IS_OPEN,
    value,
    body,
  };
}
