import {
  SELECT_CONFIG,
  TOGGLE_PLAY,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
} from './constants';

export function selectConfig(value) {
  return {
    type: SELECT_CONFIG,
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
