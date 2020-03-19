import { takeLatest, call, put, select } from 'redux-saga/effects';
import { registerSuccess, registerError } from 'containers/Register/actions';

import request from 'utils/request';
import { makeSelectEmail, makeSelectPass } from 'containers/Login/selectors';
import { REGISTERING } from './constants';

/**
 * Backend login request/response handler
 */
export function* registerReq() {
  const currEmail = yield select(makeSelectEmail());
  const currPass = yield select(makeSelectPass());

  const state = {
    email: currEmail,
    pass: currPass,
  };

  const requestURL = `http://localhost:8080/api/auth/register`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  };
  try {
    // Call our request helper (found in 'utils/request')
    const res = yield call(request, requestURL, options);
    yield put(registerSuccess(res, state));
  } catch (err) {
    yield put(registerError(err));
  }
}

export default function* registerData() {
  yield takeLatest(REGISTERING, registerReq);
}
