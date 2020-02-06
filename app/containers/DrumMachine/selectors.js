import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drumMachine state domain
 */

const selectDrumMachineDomain = state => state.drumMachine || initialState;

/**
 * Other specific selectors
 */

const makeSelectDropdownValue = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.dropdownValue,
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

export { selectDrumMachineDomain, makeSelectDropdownValue, makeSelectVol, makeSelectTempo, };
