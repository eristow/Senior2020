import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';

import ListElement from './ListElement';
import { makeSelectFiles } from './selectors';
import { removeFilesByChecked } from './actions';
import reducer from './reducer';
// import '../styles/index.css';

const key = 'fileListing';

const FileList = ({ files, onRemove }) => {
  useInjectReducer({ key, reducer });

  return (
    <div>
      <div>
        <h1>Your Files:</h1>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListElement file={file} key={index} />
        ))}
      </div>
      <div className="button-div">
        <button
          type="button"
          className="button-big"
          id="delete-all"
          onClick={() => onRemove()}
        >
          <p className="button-text">Deleted Selected</p>
        </button>
        <button type="button" className="button-big" id="export-all">
          <p className="button-text">Export Selected</p>
        </button>
      </div>
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  files: makeSelectFiles(),
});

const mapDispatchToProps = dispatch => ({
  onRemove: () => {
    dispatch(removeFilesByChecked());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FileList);
