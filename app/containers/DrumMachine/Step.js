import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { makeSelectStepState } from './selectors';
import { changeSteps } from './actions';

const flash = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5
  }
`;

const flashMixin = css`
  animation: ${flash} 0.5s linear infinite;
`;

const StepButton = styled.button`
  flex: 1;
  background: ${props => (props.offsetColor ? '#25CCF7' : '#FD7272')};
  opacity: ${props => (props.on ? 1 : 0.35)};
  border-radius: 2;
  margin: 2px;
  ${props => props.doubled && flashMixin}
`;

const isOffsetColor = index =>
  (index > 3 && index < 8) || (index > 11 && index < 16);

export const Step = React.memo(
  ({ on, index, name, doubled, setSteps, stepState }) => {
    const toggleStep = e => {
      const shiftEnabled = e.shiftKey === true;
      const steps = [...stepState[name]];
      const val =
        steps[index] === 0
          ? shiftEnabled
            ? 2
            : 1
          : shiftEnabled && steps[index] === 1
          ? 2
          : 0;
      steps[index] = val;
      setSteps({
        ...stepState,
        [name]: steps,
      });
    };
    return (
      <StepButton
        on={on}
        offsetColor={isOffsetColor(index)}
        doubled={doubled}
        onClick={toggleStep}
      />
    );
  },
);

Step.propTypes = {
  on: PropTypes.bool,
  index: PropTypes.number,
  name: PropTypes.string,
  doubled: PropTypes.bool,
  setSteps: PropTypes.func,
  stepState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  stepState: makeSelectStepState(),
});

const mapDispatchToProps = dispatch => ({
  setSteps: value => {
    dispatch(changeSteps(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Step);
