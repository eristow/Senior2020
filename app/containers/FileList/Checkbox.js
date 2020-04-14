import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { changeBoxSelection } from './actions';

const Checkbox = ({ file, onChangeBox }) => (
  <div>
    <label className="checkbox-cont">
      <input
        type="checkbox"
        value={file.checked}
        onChange={() => onChangeBox(file.id)}
      />
      <span className="fake-check" />
    </label>
  </div>
);

Checkbox.propTypes = {
  file: PropTypes.object,
  onChangeBox: PropTypes.func,
};

// const mapStateToProps = state => {};
const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
  onChangeBox: id => {
    dispatch(changeBoxSelection(id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Checkbox);
