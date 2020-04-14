import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectDrumMachineDomain = state =>
  state.drumMachine || initialState;

export const makeSelectDrumMachineState = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate,
  );

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

export const makeSelectTitle = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.title,
  );

export const makeSelectIsOpen = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.modalIsOpen,
  );

export const makeSelectIsOpenSaveButton = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.modalIsOpenSave,
  );

export const makeSelectFiles = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.files,
  );
