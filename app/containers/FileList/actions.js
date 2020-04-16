import { CHANGE_BOX, ADD_FILES, SET_FILES_FLAG } from './constants';

export function changeBoxSelection(id, index) {
  return {
    type: CHANGE_BOX,
    id,
    index,
  };
}

export function addFiles(files) {
  return {
    type: ADD_FILES,
    files,
  };
}

export function setFilesFlag(value) {
  return {
    type: SET_FILES_FLAG,
    value,
  };
}
