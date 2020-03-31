import { takeLatest, call, put, select } from 'redux-saga/effects';
import { LOGGING_IN } from 'containers/Login/constants';
import { loginSuccess, loginError } from 'containers/Login/actions';

import request from 'utils/request';
import { makeSelectEmail, makeSelectPass } from 'containers/Login/selectors';

/**
 * Backend login request/response handler
 */
export function* loginReq() {
  const currEmail = yield select(makeSelectEmail());
  const currPass = yield select(makeSelectPass());

  const state = {
    email: currEmail,
    pass: currPass,
  };

  const requestURL = `http://localhost:8080/api/auth/login`;
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
    yield put(loginSuccess(res, state));
    const { token } = res.token;
    const { email } = res.email;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('email', email);
  } catch (err) {
    yield put(loginError(err));
  }
}

export default function* loginData() {
  yield takeLatest(LOGGING_IN, loginReq);
}
