import {
  SHOW_MENU,
  CHANGE_BPM,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  TOGGLE_PLAY,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_SELECTED_TRACK,
  CHANGE_TRACK_NAMES,
  SHOW_SIDEBAR,
} from './constants';

export function showMenu(value) {
  return {
    type: SHOW_MENU,
    value,
  };
}

export function changeBpm(value) {
  return {
    type: CHANGE_BPM,
    value,
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

export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
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

export function changeSelectedTrack(value) {
  return {
    type: CHANGE_SELECTED_TRACK,
    value,
  };
}

export function changeTrackNames(track, value) {
  return {
    type: CHANGE_TRACK_NAMES,
    track,
    value,
  };
}

export function showSideBar() {
  return {
    type: SHOW_SIDEBAR,
  };
}
