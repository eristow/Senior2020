import produce from 'immer';
import drumMachineReducer from '../reducer';
import { selectKit, changeVol, changeTempo } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('drumMachineReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      selectedKit: '1',
      vol: 70,
      tempo: '80',
      playing: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(drumMachineReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the selectKit action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selectedKit = 2;
    });

    expect(drumMachineReducer(state, selectKit(2))).toEqual(expectedResult);
  });

  it('should handle the changeVol action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.vol = 2;
    });

    expect(drumMachineReducer(state, changeVol(2))).toEqual(expectedResult);
  });

  it('should handle the changeTempo action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tempo = '2';
    });

    expect(drumMachineReducer(state, changeTempo('2'))).toEqual(expectedResult);
  });
});
