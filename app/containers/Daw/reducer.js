import produce from 'immer';
import {
  SHOW_MENU,
  CHANGE_BPM,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
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
  trackVol: {
    Kick: 0,
    Snare: 0,
    HiHat: 0,
    HiHatOpen: 0,
  },
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
    }
  });

export default dawReducer;
