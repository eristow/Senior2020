import produce from 'immer';
import drumMachineReducer from '../reducer';
import {
  selectConfig,
  togglePlay,
  changeVol,
  changeTrackVol,
  changeBpm,
  changeCurrentStep,
  changeSteps,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('drumMachineReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      config: 'config1',
      vol: 0,
      bpm: '80',
      playing: false,
      stepState: {
        Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        HiHatOpen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      trackVol: {
        Kick: 0,
        Snare: 0,
        HiHat: 0,
        HiHatOpen: 0,
      },
      currentStep: 0,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(drumMachineReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the selectConfig action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.config = 'config2';
    });

    expect(drumMachineReducer(state, selectConfig('config2'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the togglePlay action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.playing = true;
    });

    expect(drumMachineReducer(state, togglePlay())).toEqual(expectedResult);
  });

  it('should handle the changeVol action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.vol = 2;
    });

    expect(drumMachineReducer(state, changeVol(2))).toEqual(expectedResult);
  });

  it('should handle the changeTrackVol action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.trackVol.Snare = 2;
    });

    expect(drumMachineReducer(state, changeTrackVol('Snare', 2))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeBpm action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.bpm = '2';
    });

    expect(drumMachineReducer(state, changeBpm('2'))).toEqual(expectedResult);
  });

  it('should handle the changeCurrentStep action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.currentStep = 2;
    });

    expect(drumMachineReducer(state, changeCurrentStep(2))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeSteps action correctly', () => {
    const testVal = {
      Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Snare: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      HiHatOpen: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    const expectedResult = produce(state, draft => {
      draft.stepState.Snare[0] = 1;
    });

    expect(drumMachineReducer(state, changeSteps(testVal))).toEqual(
      expectedResult,
    );
  });
});
