import produce from 'immer';
import {
  CHANGE_BOX,
  CHANGE_CHECKED,
  ADD_FILES,
  SET_FILES_FLAG,
} from './constants';

export const initialState = {
  files: [],
  checkedFiles: {},
  filesFlag: false,
};

/* eslint-disable default-case, no-param-reassign */
const filesReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_BOX: {
        if (!draft.checkedFiles[action.index]) {
          draft.checkedFiles[action.index] = true;
        } else {
          delete draft.checkedFiles[action.index];
        }
        break;
      }
      case CHANGE_CHECKED: {
        draft.checkedFiles = action.value;
        break;
      }
      case ADD_FILES: {
        draft.files = action.files;
        break;
      }
      case SET_FILES_FLAG: {
        draft.filesFlag = action.value;
        break;
      }
      default:
        return state;
    }
  });

export default filesReducer;
