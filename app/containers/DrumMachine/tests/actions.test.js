import {
  changeConfig,
  togglePlay,
  changeVol,
  changeTrackVol,
  changeBpm,
  changeCurrentStep,
  changeSteps,
  changeTitle,
  loadState,
  changeLoadUrl,
  changeIsOpen,
} from '../actions';
import {
  CHANGE_CONFIG,
  TOGGLE_PLAY,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  CHANGE_BPM,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_TITLE,
  LOAD_STATE,
  CHANGE_LOAD_URL,
  CHANGE_IS_OPEN,
} from '../constants';

describe('DrumMachine actions', () => {
  describe('Change Config', () => {
    it('has a type of CHANGE_CONFIG and value that was passed in', () => {
      const expected = {
        type: CHANGE_CONFIG,
        value: 'config2',
      };
      expect(changeConfig('config2')).toEqual(expected);
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

  describe('Change Title', () => {
    it('has a type of CHANGE_TITLE and value that was passed in', () => {
      const expected = {
        type: CHANGE_TITLE,
        value: 'the title',
      };
      expect(changeTitle('the title')).toEqual(expected);
    });
  });

  describe('Load State', () => {
    it('has a type of LOAD_STATE and value that was passed in', () => {
      const expected = {
        type: LOAD_STATE,
        value: { state: 'the state' },
      };
      expect(loadState({ state: 'the state' })).toEqual(expected);
    });
  });

  describe('Change Load Url', () => {
    it('has a type of CHANGE_LOAD_URL and value that was passed in', () => {
      const expected = {
        type: CHANGE_LOAD_URL,
        value: 'the url',
      };
      expect(changeLoadUrl('the url')).toEqual(expected);
    });
  });

  describe('Change Is Open', () => {
    it('has a type of CHANGE_IS_OPEN and value that was passed in', () => {
      const expected = {
        type: CHANGE_IS_OPEN,
        value: true,
      };
      expect(changeIsOpen(true)).toEqual(expected);
    });
  });
});
