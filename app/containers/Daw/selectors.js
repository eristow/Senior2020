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

const makeSelectPlaying = () =>
  createSelector(
    selectDawDomain,
    substate => substate.playing,
  );

const makeSelectCurrentStep = () =>
  createSelector(
    selectDawDomain,
    substate => substate.currentStep,
  );

const makeSelectStepState = () =>
  createSelector(
    selectDawDomain,
    substate => substate.stepState,
  );

const makeSelectSelectedTrack = () =>
  createSelector(
    selectDawDomain,
    substate => substate.selectedTrack,
  );

const makeSelectTrackNames = () =>
  createSelector(
    selectDawDomain,
    substate => substate.trackNames,
  );

const makeSelectSideBarOpen = () =>
  createSelector(
    selectDawDomain,
    substate => substate.sideBarOpen,
  );

export default makeSelectDaw;
export {
  selectDawDomain,
  makeSelectMenuStates,
  makeSelectBpm,
  makeSelectVol,
  makeSelectTrackVol,
  makeSelectPlaying,
  makeSelectCurrentStep,
  makeSelectStepState,
  makeSelectSelectedTrack,
  makeSelectTrackNames,
  makeSelectSideBarOpen,
};
