import { changeDropdown } from '../actions';
import { CHANGE_DROPDOWN } from '../constants';

describe('Timeline actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: CHANGE_DROPDOWN,
      };
      expect(changeDropdown()).toEqual(expected);
    });
  });
});
