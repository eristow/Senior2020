import produce from 'immer';
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

export const initialState = {
  menuStates: {
    File: false,
    Edit: false,
    View: false,
    Help: false,
  },
  bpm: '80',
  vol: 0,
  stepState: {
    Track1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  trackVol: [0, 0, 0, 0],
  currentStep: 0,
  playing: false,
  selectedTrack: null,
  trackNames: ['Track 1', 'Track 2', 'Track 3', 'Track 4'],
  sideBarOpen: false,
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
        draft.stepState[action.num] = action.value;
        break;
      case CHANGE_SELECTED_TRACK:
        draft.selectedTrack = action.value;
        break;
      case CHANGE_TRACK_NAMES:
        draft.trackNames[action.track] = action.value;
        break;
      case SHOW_SIDEBAR:
        draft.sideBarOpen = !draft.sideBarOpen;
        break;
    }
  });

export default dawReducer;
