import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tone from 'tone';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Slider from 'components/Slider';
import Dropdown from 'components/Dropdown';
import InputText from 'components/InputText';
import {
  makeSelectStepState,
  makeSelectCurrentStep,
  makeSelectBpm,
  makeSelectPlaying,
  makeSelectVol,
  makeSelectConfig,
  makeSelectTitle,
} from './selectors';
import {
  changeCurrentStep,
  changeVol,
  changeConfig,
  changeTitle,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import BPMInput from './BPMInput';
import PlayButton from './PlayButton';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
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

const ControlContainer = styled.div`
  text-align: center;
`;

const ControlText = styled.p`
  padding: 10px;
  margin: 0;
  color: #25ccf7;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const configs = {
  config1: {
    tracks: ['Kick', 'Snare', 'HiHat', 'HiHatOpen'],
    samples: {
      Kick: 'https://web-daw.s3.us-east-2.amazonaws.com/kick.wav',
      Snare: 'https://web-daw.s3.us-east-2.amazonaws.com/snare1.wav',
      HiHat: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed.wav',
      HiHatOpen: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen.wav',
    },
  },
  config2: {
    tracks: ['Kick', 'Snare', 'HiHat', 'HiHatOpen'],
    samples: {
      Kick: 'https://web-daw.s3.us-east-2.amazonaws.com/kick2.wav',
      Snare: 'https://web-daw.s3.us-east-2.amazonaws.com/snareRock.wav',
      HiHat: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed2.wav',
      HiHatOpen: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen2.wav',
    },
  },
  config3: {
    tracks: ['Kick', 'Snare', 'HiHat', 'HiHatOpen'],
    samples: {
      Kick: 'https://web-daw.s3.us-east-2.amazonaws.com/Kick (2).wav',
      Snare: 'https://web-daw.s3.us-east-2.amazonaws.com/snare3.wav',
      HiHat: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed3.wav',
      HiHatOpen: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen3.wav',
    },
  },
};

export function DrumMachine({
  setCurrentStepState,
  onChangeVol,
  onChangeConfig,
  onChangeTitle,
  stepState,
  currentStep,
  bpm,
  playing,
  vol,
  config,
  title,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // Couldn't figure out how to make this work in redux
  const [buffers, setBuffers] = useState({});

  // I think these are fine here/don't need to be moved to redux
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
  }, [configs]);

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
      setCurrentStepState(0);
    }
  }, [playing]);

  return (
    <Container>
      <InputText
        value={title}
        onChange={e => onChangeTitle(e)}
        fontSize="1.5em"
        width="auto"
      />
      <LoadButton />
      <Transport>
        <ControlContainer>
          <ControlText>BPM</ControlText>
          <BPMInput />
        </ControlContainer>
        <ControlContainer>
          <ControlText>Kit</ControlText>
          <Dropdown width="5em" value={config} onChange={onChangeConfig}>
            <option value="config1">EDM</option>
            <option value="config2">Rock</option>
            <option value="config3">Trap</option>
          </Dropdown>
        </ControlContainer>
        <ControlContainer>
          <ControlText>Master Volume</ControlText>
          <Slider
            onChange={onChangeVol}
            min={-60}
            max={0}
            value={vol}
            width={110}
          />
        </ControlContainer>
        <div>
          <PlayButton />
          <SaveButton />
        </div>
      </Transport>
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer
          config={config ? configs[config] : configs.config1}
          currentStep={currentStepRef.current}
          playing={playing}
          setBuffers={setBuffers}
        />
      </React.Suspense>
    </Container>
  );
}

DrumMachine.propTypes = {
  setCurrentStepState: PropTypes.func,
  onChangeVol: PropTypes.func,
  onChangeConfig: PropTypes.func,
  onChangeTitle: PropTypes.func,
  stepState: PropTypes.object,
  currentStep: PropTypes.number,
  bpm: PropTypes.string,
  playing: PropTypes.bool,
  vol: PropTypes.number,
  config: PropTypes.string,
  title: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  stepState: makeSelectStepState(),
  currentStep: makeSelectCurrentStep(),
  bpm: makeSelectBpm(),
  playing: makeSelectPlaying(),
  vol: makeSelectVol(),
  config: makeSelectConfig(),
  title: makeSelectTitle(),
});

const mapDispatchToProps = dispatch => ({
  setCurrentStepState: value => {
    dispatch(changeCurrentStep(value));
  },
  onChangeVol: evt => {
    dispatch(changeVol(evt));
  },
  onChangeConfig: evt => {
    dispatch(changeConfig(evt.target.value));
  },
  onChangeTitle: evt => {
    dispatch(changeTitle(evt.target.value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DrumMachine);
