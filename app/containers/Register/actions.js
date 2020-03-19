/*
 *
 * Register actions
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASS,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './constants';

export function register(value) {
  return {
    type: REGISTERING,
    value,
  };
}

export function registerSuccess(value) {
  return {
    type: REGISTER_SUCCESS,
    value,
  };
}

export function registerError(value) {
  return {
    type: REGISTER_FAILED,
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
