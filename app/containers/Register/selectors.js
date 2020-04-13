import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = state => state.register || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate,
  );
const makeSelectEmail = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate.email,
  );

const makeSelectPass = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate.pass,
  );

const makeSelectIsOpen = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate.modalIsOpen,
  );
export default makeSelectRegister;
export {
  selectRegisterDomain,
  makeSelectEmail,
  makeSelectPass,
  makeSelectIsOpen,
};
