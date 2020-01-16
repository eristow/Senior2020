import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the piano state domain
 */

const selectPianoDomain = state => state.piano || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Piano
 */

const makeSelectPiano = () =>
  createSelector(
    selectPianoDomain,
    substate => substate,
  );

export default makeSelectPiano;
export { selectPianoDomain };
