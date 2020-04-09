import produce from 'immer';
import dawReducer from '../reducer';
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

/* eslint-disable default-case, no-param-reassign */
describe('dawReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      menuStates: {
        File: false,
        Edit: false,
        View: false,
        Help: false,
      },
      bpm: '80',
      vol: 0,
      stepState: {
        Track1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Track2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Track3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Track4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      trackVol: [0, 0, 0, 0],
      currentStep: 0,
      playing: false,
      selectedTrack: null,
      trackNames: ['Track 1', 'Track 2', 'Track 3', 'Track 4'],
      sideBarOpen: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(dawReducer(undefined, {})).toEqual(expectedResult);
  });

  it('Should handle the showMenu action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.menuStates[1] = true;
    });

    expect(dawReducer(state, showMenu(1))).toEqual(expectedResult);
  });

  it('Should handle the changeBpm action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.bpm = '81';
    });

    expect(dawReducer(state, changeBpm('81'))).toEqual(expectedResult);
  });

  it('Should handle the changeVol action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.vol = -10;
    });

    expect(dawReducer(state, changeVol(-10))).toEqual(expectedResult);
  });

  it('Should handle the changeTrackVol action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.trackVol[1] = -10;
    });

    expect(dawReducer(state, changeTrackVol(1, -10))).toEqual(expectedResult);
  });

  it('Should handle the togglePlay action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.playing = true;
    });

    expect(dawReducer(state, togglePlay())).toEqual(expectedResult);
  });

  it('Should handle the changeCurrentStep action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.currentStep = 1;
    });

    expect(dawReducer(state, changeCurrentStep(1))).toEqual(expectedResult);
  });

  it('Should handle the changeSteps action correctly', () => {
    const testVal = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expectedResult = produce(state, draft => {
      draft.stepState.Track1[0] = 1;
    });

    expect(dawReducer(state, changeSteps('Track1', testVal))).toEqual(
      expectedResult,
    );
  });

  it('Should handle the changeSelectedTrack action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selectedTrack = 'Track1';
    });

    expect(dawReducer(state, changeSelectedTrack('Track1'))).toEqual(
      expectedResult,
    );
  });

  it('Should handle the changeTrackNames action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.trackNames[1] = 'Drums';
    });

    expect(dawReducer(state, changeTrackNames(1, 'Drums'))).toEqual(
      expectedResult,
    );
  });

  it('Should handle the showSideBar action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.sideBarOpen = true;
    });

    expect(dawReducer(state, showSideBar())).toEqual(expectedResult);
  });
});
