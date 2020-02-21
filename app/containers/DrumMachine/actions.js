import {
  SELECT_CONFIG,
  TOGGLE_PLAY,
  TOGGLE_STEP,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_BUFFERS,
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

export function toggleStep(sound, index) {
  return {
    type: TOGGLE_STEP,
    sound,
    index,
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

export function changeBuffers(value) {
  return {
    type: CHANGE_BUFFERS,
    value,
  };
}
