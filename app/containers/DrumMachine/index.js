import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tone from 'tone';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectStepState, makeSelectCurrentStep } from './selectors';
import { changeCurrentStep } from './actions';
import reducer from './reducer';
import saga from './saga';

import useBPM from './useBPM';
import useStart from './useStart';
import Transport from './Transport';
import TracksContainer from './TracksContainer';

const key = 'drumMachine';

const Container = styled.div`
  max-width: 800px;
  background: linear-gradient(to bottom right, #666, #888);
  border: 2px solid black;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  font-size: 28px;
  color: #25ccf7;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
  margin: 0;
  text-transform: uppercase;
  display: inline-block;
`;

const config = {
  tracks: ['Kick', 'Snare', 'HiHat', 'HiHatOpen'],
  samples: {
    Kick: 'https://web-daw.s3.us-east-2.amazonaws.com/kick.wav',
    Snare: 'https://web-daw.s3.us-east-2.amazonaws.com/snare2.wav',
    HiHat: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed.wav',
    HiHatOpen: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen.wav',
  },
};

export function DrumMachine({ setCurrentStepState, stepState, currentStep }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [buffers, setBuffers] = useState({});

  const [start, startButton] = useStart();
  const [bpm, bpmSelector] = useBPM(65);

  const buffersRef = useRef(buffers);
  buffersRef.current = buffers;
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;


  useEffect(() => {
    Tone.Transport.scheduleRepeat(time => {
      Object.keys(buffersRef.current).forEach(b => {
        const targetStep = stepsRef.current[b][currentStepRef.current];
        const targetBuffer = buffersRef.current[b];

        if (targetStep === 1) {
          targetBuffer.start(time);
        } else if (targetStep === 2) {
          targetBuffer.start();
          targetBuffer.start('+64n');
          targetBuffer.start('+32n');
        }
      });

      // eslint-disable-next-line no-unused-expressions
      currentStepRef.current > 14
        ? setCurrentStepState(0)
        : setCurrentStepState(currentStepRef.current + 1);
    }, '16n');
  }, [config]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    if (start) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStepState(0);
    }
  }, [start]);

  return (
    <Container>
      <Transport>
        <Logo>Drum Machine</Logo>
        {bpmSelector}
        {startButton}
      </Transport>
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer
          config={config}
          currentStep={currentStepRef.current}
          playing={start}
          setBuffers={setBuffers}
        />
      </React.Suspense>
    </Container>
  );
}

DrumMachine.propTypes = {
  setCurrentStepState: PropTypes.func,
  stepState: PropTypes.object,
  currentStep: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  stepState: makeSelectStepState(),
  currentStep: makeSelectCurrentStep(),
});

const mapDispatchToProps = dispatch => ({
  setCurrentStepState: value => {
    dispatch(changeCurrentStep(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DrumMachine);
