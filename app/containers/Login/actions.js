/*
 *
 * Login actions
 *
 */

import { DEFAULT_ACTION, CHANGE_USERNAME } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeUsername(value) {
  return {
    type: CHANGE_USERNAME,
    value,
  };
}
