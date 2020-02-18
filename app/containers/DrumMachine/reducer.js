/*
 *
 * DrumMachine reducer
 *
 */
import produce from 'immer';
import {
  SELECT_KIT,
  TOGGLE_PLAY,
  TOGGLE_STEP,
  CHANGE_VOL,
  CHANGE_TEMPO,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_BUFFERS,
} from './constants';

export const initialState = {
  selectedKit: '1',
  vol: 70,
  tempo: '80',
  playing: false,
  stepState: {
    Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HiHatOpen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  currentStep: 0,
  buffers: {},
};

/* eslint-disable default-case, no-param-reassign */
const drumMachineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_KIT:
        draft.selectedKit = action.value;
        break;
      case TOGGLE_PLAY:
        draft.playing = !draft.playing;
        break;
      case TOGGLE_STEP:
        draft.stepState[action.sound][action.index] = !draft.stepState[
          action.sound
        ][action.index];
        break;
      case CHANGE_VOL:
        draft.vol = action.value;
        break;
      case CHANGE_TEMPO:
        draft.tempo = action.value;
        break;
      case CHANGE_CURRENT_STEP:
        draft.currentStep = action.value;
        break;
      case CHANGE_STEPS:
        draft.stepState = action.value;
        break;
      case CHANGE_BUFFERS:
        draft.buffers = action.value;
    }
  });

export default drumMachineReducer;
