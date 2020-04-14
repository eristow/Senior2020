import React, { useRef, useState, useEffect } from 'react';
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
  z-index: 9;
  position: absolute;
  width: 570px;
  top: 0px;
  right: 0px;
  left: 99px;
  height: 100%;
  padding: 4px 2px;
  pointer-events: none;
`;

export default function TracksContainer({
  config,
  playing,
  currentStep,
  setBuffers,
}) {
  const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    });

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }
      function handleResize() {
        setWindowSize(getSize());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  };

  const trackRef = useRef();
  const [stepWidth, setStepWidth] = useState(0);
  const size = useWindowSize();
  console.log(stepWidth);

  const StepIndicator = styled.div.attrs(propsStep => ({
    step: propsStep.step,
  }))`
    position: absolute;
    top: 0px;
    left: ${propsStep => propsStep.step * stepWidth}px;
    width: ${() => stepWidth - 4}px;
    height: 100%;
    background: #00ff0040;
  `;

  useEffect(() => {
    if (trackRef.current) {
      const width = (trackRef.current.clientWidth - 97) / 16;
      setStepWidth(width);
    } else {
      setStepWidth(0);
    }
  }, [size.width]);

  return (
    <Wrapper>
      <IndicatorWrapper>
        {playing && <StepIndicator step={currentStep} />}
      </IndicatorWrapper>
      <div ref={trackRef}>
        {config.tracks.map(t => (
          <Track
            name={t}
            key={t}
            buffer={bufferResource.read(config.samples[t])}
            setBuffers={setBuffers}
          />
        ))}
      </div>
    </Wrapper>
  );
}

TracksContainer.propTypes = {
  config: PropTypes.object,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  setBuffers: PropTypes.func,
};
