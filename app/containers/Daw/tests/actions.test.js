import {
  showMenu,
  changeBpm,
  changeVol,
  changeTrackVol,
  togglePlay,
  changeCurrentStep,
  changeSteps,
  changeSelectedTrack,
  changeTrackNames,
  showSideBar,
} from '../actions';
import {
  SHOW_MENU,
  CHANGE_BPM,
  CHANGE_VOL,
  CHANGE_TRACK_VOL,
  TOGGLE_PLAY,
  CHANGE_CURRENT_STEP,
  CHANGE_STEPS,
  CHANGE_SELECTED_TRACK,
  CHANGE_TRACK_NAMES,
  SHOW_SIDEBAR,
} from '../constants';

describe('Daw actions', () => {
  describe('Show Menu', () => {
    it('has a type of SHOW_MENU and value', () => {
      const expected = {
        type: SHOW_MENU,
        value: 'File',
      };
      expect(showMenu('File')).toEqual(expected);
    });
  });
  describe('Change Bpm', () => {
    it('has a type of CHANGE_BPM and value', () => {
      const expected = {
        type: CHANGE_BPM,
        value: '81',
      };
      expect(changeBpm('81')).toEqual(expected);
    });
  });
  describe('Change Vol', () => {
    it('has a type of CHANGE_VOL and value', () => {
      const expected = {
        type: CHANGE_VOL,
        value: -10,
      };
      expect(changeVol(-10)).toEqual(expected);
    });
  });
  describe('Change Track Vol', () => {
    it('has a type of CHANGE_TRACK_VOL and track and value', () => {
      const expected = {
        type: CHANGE_TRACK_VOL,
        track: 1,
        value: -10,
      };
      expect(changeTrackVol(1, -10)).toEqual(expected);
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
  describe('Change Current Step', () => {
    it('has a type of CHANGE_CURRENT_STEP and value', () => {
      const expected = {
        type: CHANGE_CURRENT_STEP,
        value: 1,
      };
      expect(changeCurrentStep(1)).toEqual(expected);
    });
  });
  describe('Change Steps', () => {
    it('has a type of CHANGE_STEPS and num and value', () => {
      const expected = {
        type: CHANGE_STEPS,
        num: 1,
        value: [1],
      };
      expect(changeSteps(1, [1])).toEqual(expected);
    });
  });
  describe('Change Selected Track', () => {
    it('has a type of CHANGE_SELECTED_TRACK and value', () => {
      const expected = {
        type: CHANGE_SELECTED_TRACK,
        value: 'track1',
      };
      expect(changeSelectedTrack('track1')).toEqual(expected);
    });
  });
  describe('Change Track Names', () => {
    it('has a type of CHANGE_TRACK_NAMES and track and value', () => {
      const expected = {
        type: CHANGE_TRACK_NAMES,
        track: 1,
        value: 'track1',
      };
      expect(changeTrackNames(1, 'track1')).toEqual(expected);
    });
  });
  describe('Show SideBar', () => {
    it('has a type of SHOW_SIDEBAR', () => {
      const expected = {
        type: SHOW_SIDEBAR,
      };
      expect(showSideBar()).toEqual(expected);
    });
  });
});
