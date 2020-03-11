import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDawDomain = state => state.daw || initialState;

const makeSelectMenuStates = () =>
  createSelector(
    selectDawDomain,
    substate => substate.menuStates,
  );

const makeSelectDaw = () =>
  createSelector(
    selectDawDomain,
    substate => substate,
  );

const makeSelectBpm = () =>
  createSelector(
    selectDawDomain,
    substate => substate.bpm,
  );

const makeSelectVol = () =>
  createSelector(
    selectDawDomain,
    substate => substate.vol,
  );

const makeSelectTrackVol = () =>
  createSelector(
    selectDawDomain,
    substate => substate.trackVol,
  );

export default makeSelectDaw;
export {
  selectDawDomain,
  makeSelectMenuStates,
  makeSelectBpm,
  makeSelectVol,
  makeSelectTrackVol,
};
