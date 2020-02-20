import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectDrumMachineDomain = state =>
  state.drumMachine || initialState;

export const makeSelectSelectedKit = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.selectedKit,
  );

export const makeSelectVol = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.vol,
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

export const makeSelectBuffers = () =>
  createSelector(
    selectDrumMachineDomain,
    substate => substate.buffers,
    // substate => {
    //   console.log('selector');
    //   console.log(substate.buffers);
    //   return substate.buffers;
    // },
  );
