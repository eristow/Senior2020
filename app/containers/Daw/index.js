import React, { useRef, useEffect, useState } from 'react';
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
  makeSelectSelectedTrack,
  makeSelectTrackNames,
} from './selectors';
import { changeCurrentStep } from './actions';
import reducer from './reducer';
import saga from './saga';

import Options from './Options';
import TrackDetails from './TrackDetails';
import SideBar from './SideBar';
import TracksContainer from './TracksContainer';

const key = 'daw';

const config = ['Track1', 'Track2', 'Track3', 'Track4'];

// TODO: remove this once track sound changing is implemented
const sounds = {
  Track1: 'https://web-daw.s3.us-east-2.amazonaws.com/kick.wav',
  Track2: 'https://web-daw.s3.us-east-2.amazonaws.com/snare1.wav',
  Track3: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed.wav',
  Track4: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen.wav',
};

export function Daw({
  setCurrentStep,
  bpm,
  vol,
  playing,
  currentStep,
  stepState,
  selectedTrack,
  trackNames,
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
    if (process.env.NODE_ENV !== 'test') {
      Tone.Transport.scheduleRepeat(time => {
        Object.keys(buffersRef.current).forEach(b => {
          // console.log(b);
          // console.log(stepsRef.current);
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
    }
  }, [sounds]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      Tone.Master.volume.value = vol;
    }
  }, [vol]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      if (playing) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        setCurrentStep(0);
      }
    }
  }, [playing]);

  return (
    <div>
      <SideBar />
      <Options />
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer
          config={config}
          playing={playing}
          currentStep={currentStep}
          stepState={stepState}
          sounds={sounds}
          setBuffers={setBuffers}
        />
      </React.Suspense>
      <TrackDetails
        track={selectedTrack !== null ? trackNames[selectedTrack] : null}
      />
    </div>
  );
}

Daw.propTypes = {
  setCurrentStep: PropTypes.func,
  bpm: PropTypes.string,
  vol: PropTypes.number,
  playing: PropTypes.bool,
  currentStep: PropTypes.number,
  stepState: PropTypes.object,
  selectedTrack: PropTypes.number,
  trackNames: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bpm: makeSelectBpm(),
  vol: makeSelectVol(),
  playing: makeSelectPlaying(),
  currentStep: makeSelectCurrentStep(),
  stepState: makeSelectStepState(),
  selectedTrack: makeSelectSelectedTrack(),
  trackNames: makeSelectTrackNames(),
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
