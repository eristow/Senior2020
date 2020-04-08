import { takeLatest, call, put, select } from 'redux-saga/effects';

// import React from 'react';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { baseURL, encryptPass } from 'utils/helpers';
import { makeSelectEmail, makeSelectPass } from './selectors';
import { registerSuccess, registerError } from './actions';
import { REGISTERING } from './constants';

/**
 * Backend login request/response handler
 */
export function* registerReq() {
  const currEmail = yield select(makeSelectEmail());
  const currPass = yield select(makeSelectPass());
  const newPass = yield call(encryptPass, currPass);

  const state = {
    email: currEmail,
    pass: newPass,
  };

  const requestURL = `${baseURL}/api/auth/register`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Bearer: localStorage.getItem(jwtToken),
    },
    body: JSON.stringify(state),
  };
  try {
    // Call our request helper (found in 'utils/request')
    const res = yield call(request, requestURL, options);
    yield put(registerSuccess(res, state));
    yield put(push('/login'));
  } catch (err) {
    alert(err);
    yield put(registerError(err));
  }
}

export default function* registerData() {
  yield takeLatest(REGISTERING, registerReq);
}
