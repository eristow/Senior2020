import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { bufferResource } from './bufferResource';
import Track from './Track';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 2px solid #444;
  border-radius: 4px;
  margin: 0px 20px 20px;
  position: relative;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  width: 570px;
  top: 0px;
  right: 0px;
  left: 99px;
  height: 100%;
  padding: 4px 2px;
  pointer-events: none;
`;

const StepIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: ${props => props.step * 39}px;
  width: 35px;
  height: 100%;
  background: #00ff0040;
`;

export default function TracksContainer({
  config,
  playing,
  currentStep,
  setBuffers,
}) {
  return (
    <Wrapper>
      <IndicatorWrapper>
        {playing && <StepIndicator step={currentStep} />}
      </IndicatorWrapper>
      {config.tracks.map(t => (
        <Track
          name={t}
          key={t}
          buffer={bufferResource.read(config.samples[t])}
          setBuffers={setBuffers}
        />
      ))}
    </Wrapper>
  );
}

TracksContainer.propTypes = {
  config: PropTypes.object,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  setBuffers: PropTypes.func,
};
