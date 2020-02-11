/*
 *
 * DrumMachine reducer
 *
 */
import produce from 'immer';
import {
  SELECT_KIT,
  PLAY,
  STOP,
  TOGGLE_BLOCK,
  CHANGE_VOL,
  CHANGE_TEMPO,
} from './constants';

export const initialState = {
  selectedKit: '1',
  vol: 70,
  tempo: '80',
  playing: false,
};

/* eslint-disable default-case, no-param-reassign */
const drumMachineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_KIT:
        draft.selectedKit = action.value;
        break;
      case PLAY:
        draft.playing = true;
        break;
      case STOP:
        draft.playing = false;
        break;
      // TODO: implement
      case TOGGLE_BLOCK:
        break;
      case CHANGE_VOL:
        draft.vol = action.value;
        break;
      case CHANGE_TEMPO:
        draft.tempo = action.value;
        break;
    }
  });

export default drumMachineReducer;
