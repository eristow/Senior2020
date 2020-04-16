import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectFileListingDomain = state =>
  state.fileListing || initialState;

export const makeSelectFiles = () =>
  createSelector(
    selectFileListingDomain,
    substate => substate.files,
  );

export const makeSelectFilesFlag = () =>
  createSelector(
    selectFileListingDomain,
    substate => substate.filesFlag,
  );

export const makeSelectCheckedFiles = () =>
  createSelector(
    selectFileListingDomain,
    substate => substate.checkedFiles,
  );
