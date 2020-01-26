import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timeline state domain
 */

const selectTimelineDomain = state => state.timeline || initialState;

/**
 * Other specific selectors
 */

const makeSelectDropdownValue = () =>
  createSelector(
    selectTimelineDomain,
    substate => substate.dropdownValue,
  );

/**
 * Default selector used by Timeline
 */

const makeSelectTimeline = () =>
  createSelector(
    selectTimelineDomain,
    substate => substate,
  );

export default makeSelectTimeline;
export { selectTimelineDomain, makeSelectDropdownValue };
