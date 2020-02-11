import {
  selectKit,
  play,
  stop,
  toggleBlock,
  changeVol,
  changeTempo,
} from '../actions';
import {
  SELECT_KIT,
  PLAY,
  STOP,
  TOGGLE_BLOCK,
  CHANGE_VOL,
  CHANGE_TEMPO,
} from '../constants';

describe('DrumMachine actions', () => {
  describe('Select Kit', () => {
    it('has a type of SELECT_KIT and value that was passed in', () => {
      const expected = {
        type: SELECT_KIT,
        value: 2,
      };
      expect(selectKit(2)).toEqual(expected);
    });
  });

  describe('Play', () => {
    it('has a type of PLAY', () => {
      const expected = {
        type: PLAY,
      };
      expect(play()).toEqual(expected);
    });
  });

  describe('Stop', () => {
    it('has a type of STOP', () => {
      const expected = {
        type: STOP,
      };
      expect(stop()).toEqual(expected);
    });

    // TODO: update when implemented
    describe('Toggle Block', () => {
      it('has a type of TOGGLE_BLOCK', () => {
        const expected = {
          type: TOGGLE_BLOCK,
        };
        expect(toggleBlock()).toEqual(expected);
      });
    });

    describe('Change Vol', () => {
      it('has a type of CHANGE_VOL and value that was passed in', () => {
        const expected = {
          type: CHANGE_VOL,
          value: 2,
        };
        expect(changeVol(2)).toEqual(expected);
      });
    });
  });

  describe('Change Tempo', () => {
    it('has a type of CHANGE_TEMPO and value that was passed in', () => {
      const expected = {
        type: CHANGE_TEMPO,
        value: '2',
      };
      expect(changeTempo('2')).toEqual(expected);
    });
  });
});
