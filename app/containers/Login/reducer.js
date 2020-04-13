/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { CHANGE_EMAIL, CHANGE_PASS, CHANGE_IS_OPEN } from './constants';

export const initialState = { email: '', pass: '' };

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.value;
        break;
      case CHANGE_PASS:
        draft.pass = action.value;
        break;
      case CHANGE_IS_OPEN:
        draft.modalIsOpen = action.value;
        break;
    }
  });

export default loginReducer;
