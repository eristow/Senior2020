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
      // TODO: I don't think this is correct... This action isn't working properly.
      draft.dropdownValue = undefined;
    });

    expect(timelineReducer(state, changeDropdown())).toEqual(expectedResult);
  });
});
