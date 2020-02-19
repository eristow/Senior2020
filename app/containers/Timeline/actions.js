/*
 *
 * Timeline actions
 *
 */

import { CHANGE_DROPDOWN } from './constants';

/**
 * Changes the currently selected item in dropdown
 *
 * @param {string} value The new selected item
 *
 * @return {object} An action object with a type of CHANGE_SELECT
 */

export function changeDropdown(value) {
  return {
    type: CHANGE_DROPDOWN,
    value,
  };
}
