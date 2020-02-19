import { changeDropdown } from '../actions';
import { CHANGE_DROPDOWN } from '../constants';

describe('Timeline actions', () => {
  describe('changeDropdown', () => {
    it('has a type of CHANGE_DROPDOWN and value that was passed in', () => {
      const expected = {
        type: CHANGE_DROPDOWN,
        value: 2,
      };
      expect(changeDropdown(2)).toEqual(expected);
    });
  });
});
