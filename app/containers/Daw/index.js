import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tone from 'tone';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectBpm,
  makeSelectVol,
  makeSelectPlaying,
  makeSelectCurrentStep,
  makeSelectStepState,
} from './selectors';
import { changeCurrentStep } from './actions';
import reducer from './reducer';
import saga from './saga';

import Options from './Options';
import Track from './Track';

const TrackContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const key = 'daw';

const config = ['Kick', 'Snare', 'Hi Hat Closed', 'Hi Hat Open'];

export function Daw({
  setCurrentStep,
  bpm,
  vol,
  playing,
  currentStep,
  stepState,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [buffers, setBuffers] = useState({});
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
        ? setCurrentStep(0)
        : setCurrentStep(currentStepRef.current + 1);
    }, '16n');
  }, [config]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    Tone.Master.volume.value = vol;
  }, [vol]);

  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStep(0);
    }
  }, [playing]);

  return (
    <div>
      <Options />
      <TrackContainer>
        {config.map(t => (
          <Track key={t} name={t} playing={playing} currentStep={currentStep} />
        ))}
      </TrackContainer>
    </div>
  );
}

Daw.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func,
  bpm: PropTypes.string,
  vol: PropTypes.number,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  stepState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  bpm: makeSelectBpm(),
  vol: makeSelectVol(),
  playing: makeSelectPlaying(),
  currentStep: makeSelectCurrentStep(),
  stepState: makeSelectStepState(),
});

const mapDispatchToProps = dispatch => ({
  setCurrentStep: value => {
    dispatch(changeCurrentStep(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Daw);
