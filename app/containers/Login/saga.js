import { takeLatest, call, put, select } from 'redux-saga/effects';
import { LOGGING_IN } from 'containers/Login/constants';
import { loginSuccess, loginError } from 'containers/Login/actions';

import request from 'utils/request';
import { makeSelectEmail, makeSelectPass } from 'containers/Login/selectors';
import { push } from 'connected-react-router';
import { baseURL, comparePass } from 'utils/helpers';

/**
 * Backend login request/response handler
 */
export function* loginReq() {
  const currEmail = yield select(makeSelectEmail());
  const currPass = yield select(makeSelectPass());

  const state = {
    email: currEmail,
  };

  const requestURL = `${baseURL}/api/auth/login`;

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
    const { token } = res;
    const { email } = res;
    const { hash } = res;
    const passMatch = yield call(comparePass, currPass, hash);
    if (passMatch) {
      yield put(loginSuccess(res, state));
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('email', email);
      yield put(push('/fileList'));
      window.location.reload();
    } else {
      throw new Error('Incorrect login credentials');
    }
  } catch (err) {
    alert(err);
    yield put(loginError(err));
  }
}

export default function* loginData() {
  yield takeLatest(LOGGING_IN, loginReq);
}
