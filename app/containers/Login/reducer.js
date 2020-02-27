/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, CHANGE_USERNAME } from './constants';

export const initialState = { username: '' };

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_USERNAME:
        draft.username = action.value;
        break;
    }
  });

export default loginReducer;
