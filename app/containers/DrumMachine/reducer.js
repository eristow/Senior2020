import produce from 'immer';
import {
  SELECT_CONFIG,
  TOGGLE_PLAY,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
} from './constants';

export const initialState = {
  config: 'config1',
  vol: 0,
  bpm: '80',
  playing: false,
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
};

/* eslint-disable default-case, no-param-reassign */
const drumMachineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_CONFIG:
        draft.config = action.value;
        break;
      case TOGGLE_PLAY:
        draft.playing = !draft.playing;
        break;
      case CHANGE_VOL:
        draft.vol = action.value;
        break;
      case CHANGE_TRACK_VOL:
        draft.trackVol[action.track] = action.value;
        break;
      case CHANGE_BPM:
        draft.bpm = action.value;
        break;
      case CHANGE_CURRENT_STEP:
        draft.currentStep = action.value;
        break;
      case CHANGE_STEPS:
        draft.stepState = action.value;
        break;
    }
  });

export default drumMachineReducer;
