import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drumMachine state domain
 */

const selectDrumMachineDomain = state => state.drumMachine || initialState;

/**
 * Other specific selectors
 */

const makeSelectSelectedKit = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.selectedKit,
  );

const makeSelectVol = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.vol,
  );

const makeSelectTempo = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.tempo,
  );

const makeSelectPlaying = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.playing,
  );

export {
  selectDrumMachineDomain,
  makeSelectSelectedKit,
  makeSelectVol,
  makeSelectTempo,
  makeSelectPlaying,
};
