import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drumMachine state domain
 */

const selectDrumMachineDomain = state => state.drumMachine || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DrumMachine
 */

const makeSelectDrumMachine = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate,
  );

export default makeSelectDrumMachine;
export { selectDrumMachineDomain };
