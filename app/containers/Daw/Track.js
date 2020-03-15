import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TrackConfig from './TrackConfig';

const Container = styled.div`
  display: flex;
  background: gray;
  width: auto;
  height: auto;
  border: 1px solid black;
  margin: 1px;
`;

const IndicatorWrapper = styled.div`
  position: relative;
  width: 570px;
  top: 0px;
  right: 0px;
  height: 100px;
  padding: 4px 2px;
  pointer-events: none;
`;

// TODO: how to make this look smoother? interpolate between last location and current one?
const StepIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: ${props => props.step * 44}px;
  width: 3px;
  height: 100%;
  background: #00ff0040;
`;

export function Track({ name, num, playing, currentStep }) {
  return (
    <Container>
      <TrackConfig name={name} num={num} />
      {/* TODO: this is where patterns will go (midi or audio) */}
      <IndicatorWrapper>
        {playing && <StepIndicator step={currentStep} />}
      </IndicatorWrapper>
    </Container>
  );
}

Track.propTypes = {
  name: PropTypes.string,
  num: PropTypes.number,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
};

export default Track;
