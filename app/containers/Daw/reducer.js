import produce from 'immer';
import {
  SHOW_MENU,
  CHANGE_BPM,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  TOGGLE_PLAY,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
} from './constants';

export const initialState = {
  menuStates: {
    File: false,
    Edit: false,
    View: false,
    Help: false,
  },
  bpm: '80',
  vol: 0,
  // TODO: make stepState and trackVol keys dynamic
  stepState: {
    Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HiHatOpen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  trackVol: {
    Kick: 0,
    Snare: 0,
    HiHat: 0,
    HiHatOpen: 0,
  },
  currentStep: 0,
  playing: false,
};

/* eslint-disable default-case, no-param-reassign */
const dawReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_MENU:
        draft.menuStates[action.value] = !draft.menuStates[action.value];
        break;
      case CHANGE_BPM:
        draft.bpm = action.value;
        break;
      case CHANGE_VOL:
        draft.vol = action.value;
        break;
      case CHANGE_TRACK_VOL:
        draft.trackVol[action.track] = action.value;
        break;
      case TOGGLE_PLAY:
        draft.playing = !draft.playing;
        break;
      case CHANGE_CURRENT_STEP:
        draft.currentStep = action.value;
        break;
      case CHANGE_STEPS:
        draft.stepState = action.value;
        break;
    }
  });

export default dawReducer;
