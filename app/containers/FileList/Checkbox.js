import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import { changeBoxSelection } from './actions';
import { makeSelectCheckedFiles } from './selectors';

const key = 'fileListing';

const Checkbox = ({ file, checkedFiles, index, onChangeBox }) => {
  useInjectReducer({ key, reducer });
  return (
    <div>
      <label className="checkbox-cont">
        <input
          type="checkbox"
          value={checkedFiles.index}
          onChange={() => onChangeBox(file.ETag, index)}
        />
        <span className="fake-check" />
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  file: PropTypes.object,
  checkedFiles: PropTypes.object,
  index: PropTypes.number,
  onChangeBox: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  checkedFiles: makeSelectCheckedFiles(),
});

const mapDispatchToProps = dispatch => ({
  onChangeBox: (id, index) => {
    dispatch(changeBoxSelection(id, index));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Checkbox);
