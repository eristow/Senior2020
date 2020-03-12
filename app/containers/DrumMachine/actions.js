import {
  CHANGE_CONFIG,
  TOGGLE_PLAY,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_TITLE,
  LOAD_STATE,
} from './constants';

export function changeConfig(value) {
  return {
    type: CHANGE_CONFIG,
    value,
  };
}

export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
  };
}

export function changeVol(value) {
  return {
    type: CHANGE_VOL,
    value,
  };
}

export function changeTrackVol(track, value) {
  return {
    type: CHANGE_TRACK_VOL,
    track,
    value,
  };
}

export function changeBpm(value) {
  return {
    type: CHANGE_BPM,
    value,
  };
}

export function changeCurrentStep(value) {
  return {
    type: CHANGE_CURRENT_STEP,
    value,
  };
}

export function changeSteps(value) {
  return {
    type: CHANGE_STEPS,
    value,
  };
}

export function changeTitle(value) {
  return {
    type: CHANGE_TITLE,
    value,
  };
}

export function loadState(value) {
  return {
    type: LOAD_STATE,
    value,
  };
}
