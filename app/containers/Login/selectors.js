import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

const makeSelectEmail = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.email,
  );

const makeSelectPass = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.pass,
  );

export default makeSelectLogin;
export { selectLoginDomain, makeSelectEmail, makeSelectPass };
