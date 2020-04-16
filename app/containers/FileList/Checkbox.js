import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import { changeBoxSelection } from './actions';
import { makeSelectCheckedFiles } from './selectors';

const key = 'fileListing';

// const HiddenCheck = styled.input.attrs({ type: 'checkbox' })`
//   border: 0;
//   clip: rect(0 0 0 0);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// `;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheck = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => (props.checked ? 'deepskyblue' : 'white')};
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Checkbox = ({ file, checkedFiles, index, onChangeBox }) => {
  useInjectReducer({ key, reducer });

  return (
    <CheckboxContainer>
      {/* <HiddenCheck
        type="checkbox"
        value={checkedFiles[index]}
        checked={checkedFiles[index]}
        onChange={() => onChangeBox(file.ETag, index)}
      /> */}
      <StyledCheck
        checked={checkedFiles[index]}
        onClick={() => onChangeBox(file.ETag, index)}
      >
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheck>
    </CheckboxContainer>
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
