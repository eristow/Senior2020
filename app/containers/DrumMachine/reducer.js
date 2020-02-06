/*
 *
 * DrumMachine reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_DROPDOWN,
  PLAY,
  STOP,
  TOGGLE_BLOCK,
  CHANGE_VOL,
  CHANGE_TEMPO,
} from './constants';

export const initialState = {
  dropdownValue: '1',
  vol: 70,
  tempo: 80,
};

/* eslint-disable default-case, no-param-reassign */
const drumMachineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DROPDOWN:
        draft.dropdownValue = action.value;
        break;
      // TODO: implement these
      case PLAY:
        break;
      case STOP:
        break;
      case TOGGLE_BLOCK:
        break;
      case CHANGE_VOL:
        break;
      case CHANGE_TEMPO:
        break;
    }
  });

export default drumMachineReducer;
