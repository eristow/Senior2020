import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the daw state domain
 */

const selectDawDomain = state => state.daw || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Daw
 */

const makeSelectDaw = () =>
  createSelector(
    selectDawDomain,
    substate => substate,
  );

export default makeSelectDaw;
export { selectDawDomain };
