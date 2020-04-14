import produce from 'immer';
import { REMOVE_FILE, CHANGE_BOX, REMOVE_FILES, ADD_FILES } from './constants'; // ADD_FILE, EDIT_FILE, REMOVE_FILES

export const initialState = {
  files: [],
};

/* eslint-disable default-case, no-param-reassign */
const filesReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    console.log(action.type);
    switch (action.type) {
      case REMOVE_FILE: {
        const files = draft.filter(file => file.id !== action.id);
        draft.files = files;
        break;
      }
      case REMOVE_FILES: {
        const files = draft.filter(file => file.checked === false);
        draft.files = files;
        break;
      }
      case CHANGE_BOX: {
        const files = draft;
        const file = draft.find(f => f.id === action.id);
        file.checked = !file.checked;
        files.forEach((f, index) => {
          if (f.id === action.id) {
            files[index] = f;
          }
        });
        draft.files = files;
        break;
      }
      case ADD_FILES: {
        console.log(draft.files);
        console.log(action.files);
        draft.files = action.files;
        break;
      }
      default:
        return state;
    }
  });

export default filesReducer;
