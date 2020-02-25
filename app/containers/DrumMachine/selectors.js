import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectDrumMachineDomain = state =>
  state.drumMachine || initialState;

export const makeSelectConfig = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.config,
  );

export const makeSelectVol = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.vol,
  );

export const makeSelectTrackVol = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.trackVol,
  );

export const makeSelectBpm = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.bpm,
  );

export const makeSelectPlaying = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.playing,
  );

export const makeSelectStepState = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.stepState,
  );

export const makeSelectCurrentStep = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.currentStep,
  );
