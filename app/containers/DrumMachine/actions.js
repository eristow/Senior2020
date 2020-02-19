/*
 *
 * DrumMachine actions
 *
 */

import {
  SELECT_KIT,
  TOGGLE_PLAY,
  TOGGLE_STEP,
  CHANGE_VOL,
  CHANGE_TEMPO,
  CHANGE_CURRENT_STEP,
  CHANGE_BUFFERS,
} from './constants';

/**
 * Changes the currently selected kit in dropdown
 *
 * @param {string} value The new selected kit
 *
 * @return {object} An action object with a type of CHANGE_SELECT
 */
export function selectKit(value) {
  return {
    type: SELECT_KIT,
    value,
  };
}

/**
 * Start or stop playing the drum machine.
 *
 * @return {object} An action object with a type of TOGGLE_PLAY
 */
export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
  };
}

/**
 * Toggle the status of a step.
 *
 * @return {object} An action object with a type of TOGGLE_STEP
 */
export function toggleStep(sound, index) {
  return {
    type: TOGGLE_STEP,
    sound,
    index,
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
  return {
    type: CHANGE_TEMPO,
    value,
  };
}

export function changeCurrentStep(value) {
  return {
    type: CHANGE_CURRENT_STEP,
    value,
  };
}

export function changeBuffers(value) {
  return {
    type: CHANGE_BUFFERS,
    value,
  };
}
