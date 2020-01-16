import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drums state domain
 */

const selectDrumsDomain = state => state.drums || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Drums
 */

const makeSelectDrums = () =>
  createSelector(
    selectDrumsDomain,
    substate => substate,
  );

export default makeSelectDrums;
export { selectDrumsDomain };
