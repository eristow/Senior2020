/*
 *
 * DrumMachine actions
 *
 */

import {
  CHANGE_DROPDOWN,
  PLAY,
  STOP,
  TOGGLE_BLOCK,
  CHANGE_VOL,
  CHANGE_TEMPO,
} from './constants';

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

/**
 * Start playing the drum machine.
 *
 * @param {string} value
 *
 * @return {object} An action object with a type of PLAY
 */
export function play(value) {
  console.log(`PLAY: ${value}`);
  console.log(value);
  return {
    type: PLAY,
    value,
  };
}

/**
 * Stop playing the drum machine.
 *
 * @param {string} value
 *
 * @return {object} An action object with a type of STOP
 */
export function stop(value) {
  console.log(`STOP: ${value}`);
  console.log(value);
  return {
    type: STOP,
    value,
  };
}

/**
 * Toggle the status of a block.
 *
 * @param {string} value
 *
 * @return {object} An action object with a type of TOGGLE_BLOCK
 */
export function toggleBlock(value) {
  console.log(`TOGGLE_BLOCK: ${value}`);
  return {
    type: TOGGLE_BLOCK,
    value,
  };
}

/**
 * Change volume.
 *
 * @param {string} value
 *
 * @return {object} An action object with a type of CHANGE_VOL
 */
export function changeVol(value) {
  console.log(`CHANGE_VOL: ${value}`);
  return {
    type: CHANGE_VOL,
    value,
  };
}

/**
 * Change tempo.
 *
 * @param {string} value
 *
 * @return {object} An action object with a type of CHANGE_TEMPO
 */
export function changeTempo(value) {
  console.log('CHANGE_TEMPO:');
  console.dir(value);
  return {
    type: CHANGE_TEMPO,
    value,
  };
}
