import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Track from './Track';
import { bufferResource } from './bufferResource';

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const TracksContainer = ({
  config,
  playing,
  currentStep,
  stepState,
  sounds,
  setBuffers,
}) => (
  <Container>
    {config.map(t => (
      <Track
        key={t}
        name={config[config.indexOf(t)]}
        num={config.indexOf(t)}
        playing={playing}
        currentStep={currentStep}
        stepState={stepState}
        buffer={bufferResource.read(sounds[t])}
        setBuffers={setBuffers}
      />
    ))}
  </Container>
);

TracksContainer.propTypes = {
  config: PropTypes.array,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  stepState: PropTypes.object,
  sounds: PropTypes.object,
  setBuffers: PropTypes.func,
};

export default TracksContainer;
