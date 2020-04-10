import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TrackConfig from './TrackConfig';
import Steps from './Steps';

const Container = styled.div`
  display: flex;
  background: gray;
  width: auto;
  height: auto;
  border: 1px solid black;
  margin: 1px;
  position: relative;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  width: 570px;
  top: 0px;
  right: 0px;
  left: 100px;
  height: 100px;
  padding: 4px 2px;
  pointer-events: none;
`;

// TODO: how to make this look smoother? interpolate between last location and current one?
const StepIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: ${props => props.step * 41.5}px;
  width: 40px;
  height: 100%;
  background: #00ff0040;
`;

export function Track({
  name,
  num,
  playing,
  currentStep,
  stepState,
  buffer,
  setBuffers,
}) {
  useEffect(() => {
    setBuffers(buffers => ({
      ...buffers,
      [name]: buffer,
    }));
  }, [buffer]);

  return (
    <Container>
      <TrackConfig num={num} buffer={buffer} />
      {/* TODO: this is where patterns will go (midi or audio) */}
      <IndicatorWrapper>
        {playing && <StepIndicator step={currentStep} />}
      </IndicatorWrapper>
      <Steps name={name} stepsState={stepState} />
    </Container>
  );
}

Track.propTypes = {
  name: PropTypes.string,
  num: PropTypes.number,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  stepState: PropTypes.object,
  buffer: PropTypes.object,
  setBuffers: PropTypes.func,
};

export default Track;
