/*
 *
 * Timeline reducer
 *
 */
import produce from 'immer';
import { CHANGE_DROPDOWN } from './constants';

export const initialState = {
  dropdownValue: '1',
};

/* eslint-disable default-case, no-param-reassign */
const timelineReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DROPDOWN:
        draft.dropdownValue = action.value;
        break;
    }
  });

export default timelineReducer;
