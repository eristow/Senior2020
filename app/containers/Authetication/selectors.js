import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authetication state domain
 */

const selectAutheticationDomain = state => state.authetication || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Authetication
 */

const makeSelectAuthetication = () =>
  createSelector(
    selectAutheticationDomain,
    substate => substate,
  );

export default makeSelectAuthetication;
export { selectAutheticationDomain };
