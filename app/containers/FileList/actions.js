import { REMOVE_FILE, REMOVE_FILES, CHANGE_BOX, ADD_FILES } from './constants';

export function removeFileById(id) {
  return {
    type: REMOVE_FILE,
    id,
  };
}

export function removeFilesByChecked() {
  return {
    type: REMOVE_FILES,
  };
}

export function changeBoxSelection(id) {
  return {
    type: CHANGE_BOX,
    id,
  };
}

export function addFiles(files) {
  console.log(files);
  return {
    type: ADD_FILES,
    files,
  };
}
