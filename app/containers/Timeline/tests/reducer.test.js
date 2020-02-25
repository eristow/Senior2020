import produce from 'immer';
import timelineReducer from '../reducer';
import { changeDropdown } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('timelineReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      dropdownValue: '1',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(timelineReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeDropdown action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.dropdownValue = 2;
    });

    expect(timelineReducer(state, changeDropdown(2))).toEqual(expectedResult);
  });
});
