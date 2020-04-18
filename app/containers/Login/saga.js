import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { baseURL, comparePass } from 'utils/helpers';
import { LOGGING_IN } from './constants';
import {
  loginSuccess,
  loginError,
  changeIsOpen,
  changeShowOk,
} from './actions';
import { makeSelectEmail, makeSelectPass } from './selectors';

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
      yield put(push('/filelist'));
      window.location.reload();
    } else {
      throw new Error('Incorrect login credentials');
    }
  } catch (err) {
    // console.log(typeof err.response);
    if (typeof err.response === 'undefined' || err.response.status !== 500) {
      yield put(changeShowOk(true));
      yield put(changeIsOpen(true, 'Wrong Email or Password.'));
    } else {
      yield put(changeShowOk(true));
      yield put(changeIsOpen(true, 'Communication error. Please try again.'));
      // console.log(err.response.status);
      // alert(err);
      yield put(loginError(err));
    }
  }
}

export default function* loginData() {
  yield takeLatest(LOGGING_IN, loginReq);
}
