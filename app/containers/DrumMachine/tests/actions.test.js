import {
  selectConfig,
  togglePlay,
  changeVol,
  changeTrackVol,
  changeBpm,
  changeCurrentStep,
  changeSteps,
} from '../actions';
import {
  SELECT_CONFIG,
  TOGGLE_PLAY,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
} from '../constants';

describe('DrumMachine actions', () => {
  describe('Select Config', () => {
    it('has a type of SELECT_CONFIG and value that was passed in', () => {
      const expected = {
        type: SELECT_CONFIG,
        value: 'config2',
      };
      expect(selectConfig('config2')).toEqual(expected);
    });
  });

  describe('Toggle Play', () => {
    it('has a type of TOGGLE_PLAY', () => {
      const expected = {
        type: TOGGLE_PLAY,
      };
      expect(togglePlay()).toEqual(expected);
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

  describe('Change Track Vol', () => {
    it('has a type of CHANGE_TRACK_VOL and values that was passed in', () => {
      const expected = {
        type: CHANGE_TRACK_VOL,
        track: 'Snare',
        value: 2,
      };
      expect(changeTrackVol('Snare', 2)).toEqual(expected);
    });
  });

  describe('Change Bpm', () => {
    it('has a type of CHANGE_BPM and value that was passed in', () => {
      const expected = {
        type: CHANGE_BPM,
        value: '2',
      };
      expect(changeBpm('2')).toEqual(expected);
    });
  });

  describe('Change Current Step', () => {
    it('has a type of CHANGE_CURRENT_STEP and value that was passed in', () => {
      const expected = {
        type: CHANGE_CURRENT_STEP,
        value: '2',
      };
      expect(changeCurrentStep('2')).toEqual(expected);
    });
  });

  describe('Change Steps', () => {
    it('has a type of CHANGE_STEPS and value that was passed in', () => {
      const expected = {
        type: CHANGE_STEPS,
        value: '2',
      };
      expect(changeSteps('2')).toEqual(expected);
    });
  });
});
