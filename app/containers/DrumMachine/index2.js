/**
 *
 * DrumMachine
 *
 */

import React, { useEffect, useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import Tone from 'tone';

import H2 from 'components/H2';
import P from 'components/P';
import Slider from 'components/Slider';
import InputNumber from 'components/InputNumber';
import Dropdown from 'components/Dropdown';
import Step from 'components/Step';
import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import useStart from './useStart';
import useBPM from './useBPM';
import {
  makeSelectSelectedKit,
  makeSelectVol,
  makeSelectTempo,
  makeSelectPlaying,
  makeSelectStepState,
  makeSelectCurrentStep,
  makeSelectBuffers,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  selectKit,
  togglePlay,
  toggleStep,
  changeVol,
  changeTempo,
  changeCurrentStep,
  changeBuffers,
} from './actions';

import messages from './messages';
import Container from './Container';
import Settings from './Settings';
import Grid from './Grid';
import TracksContainer from './TracksContainer';
import StepContext from './StepContext';

const key = 'drumMachine';

// TODO: fix this. fix it all lol...
export function DrumMachine({
  onChangeKit,
  onChangeVol,
  onChangeTempo,
  onClickPlay,
  onClickStep,
  // setCurrentStep,
  // setBuffers,
  selectedKit,
  vol,
  tempo,
  playing,
  // stepState,
  // currentStep,
  // buffers,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const Num = styled.div`
    width: 3.75em;
    height: 15px;
    float: left;
    margin: 3px 1px 1px;
    text-align: center;
    font-size: 12px;
  `;
  const BoldNum = styled.div`
    width: 3.75em;
    height: 15px;
    float: left;
    margin: 3px 1px 1px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  `;

  const config = {
    tracks: ['Kick', 'Snare'],
    samples: {
      Kick: 'app/audio/kick.wav',
      Snare: 'app/audio/snare.wav',
    },
  };

  const initialStepState = {
    Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  const [stepState, setSteps] = useState(initialStepState);
  const [buffers, setBuffers] = useState({});
  const [currentStep, setCurrentStepState] = useState(0);
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
      Object.keys(buffersRef.current).forEach(
        b => {
          const targetStep = stepsRef.current[b][currentStepRef.current];
          const targetBuffer = buffersRef.current[b];

          if (targetStep === 1) {
            targetBuffer.start(time);
          } else if (targetStep === 2) {
            targetBuffer.start();
            targetBuffer.start('+64n');
            targetBuffer.start('+32n');
          }
        },
        [config],
      );

      setCurrentStepState(step => (step > 14 ? 0 : step + 1));
    }, '16n');
  });

  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStepState(0);
    }
  }, [bpm]);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [start]);

  return (
    <Container>
      <H2>
        <FormattedMessage {...messages.title} />
        {playing ? '\tPlaying' : ''}
      </H2>
      <Settings>
        <div style={{ textAlign: 'center' }}>
          <P marginTop="0.25em" marginBottom="0em">
            <FormattedMessage {...messages.masterVol} />
          </P>
          <Slider onChange={onChangeVol} defaultValue={vol} width={110} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <P marginTop="0.25em" marginBottom="0em">
            <FormattedMessage {...messages.tempo} />
          </P>
          <InputNumber value={tempo} width="4em" onChange={onChangeTempo} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <P marginTop="0.25em" marginBottom="0em">
            <FormattedMessage {...messages.drumKits} />
          </P>
          <Dropdown width="5em" value={selectedKit} onChange={onChangeKit}>
            <option value="1">Kit 1</option>
            <option value="2">Kit 2</option>
            <option value="3">Kit 3</option>
          </Dropdown>
        </div>
        <div style={{ textAlign: 'center' }}>
          <P marginTop="0.25em" marginBottom="0em">
            {'Start/Stop'}
          </P>
          <Button
            text={!playing ? 'Play' : 'Stop'}
            width="4em"
            onClick={onClickPlay}
          />
        </div>
      </Settings>
      <Grid>
        <div style={{ display: 'inline-block', marginBottom: '0.5em' }}>
          {initialStepState.Kick.map((val, i) =>
            i % 4 === 0 ? (
              <BoldNum key={`step ${i.toString()}`}>{i + 1}</BoldNum>
            ) : (
              <Num key={`step ${i.toString()}`}>{i + 1}</Num>
            ),
          )}
        </div>

        {/* <div style={{ display: 'inline' }}>
          <P marginTop="0em" marginBottom="0em">
            <FormattedMessage {...messages.snare} />
          </P>
          <div>
            {stepState.snare.map((val, i) => (
              <Step
                style={
                  stepState.snare[i] === true
                    ? { background: 'red' }
                    : { background: 'gray' }
                }
                key={`snare${i.toString()}`}
                onClick={() => onClickStep('snare', i)}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'inline' }}>
          <P marginTop="0em" marginBottom="0em">
            <FormattedMessage {...messages.kick} />
          </P>
          <div>
            {stepState.kick.map((val, i) => (
              <Step
                style={
                  stepState.kick[i] === true
                    ? { background: 'red' }
                    : { background: 'gray' }
                }
                key={`kick${i.toString()}`}
                onClick={() => onClickStep('kick', i)}
              />
            ))}
          </div>
        </div> */}
        {bpmSelector}
        {startButton}
        <StepContext.Provider value={{ state: stepState, setSteps }}>
          <TracksContainer
            config={config}
            currentStep={currentStepRef.current}
            playing={start}
            setBuffers={setBuffers}
          />
        </StepContext.Provider>
      </Grid>
    </Container>
  );
}

DrumMachine.propTypes = {
  dispatch: PropTypes.func,
  onChangeKit: PropTypes.func,
  onChangeVol: PropTypes.func,
  onChangeTempo: PropTypes.func,
  onClickPlay: PropTypes.func,
  onClickStep: PropTypes.func,
  setCurrentStep: PropTypes.func,
  setBuffers: PropTypes.func,
  selectedKit: PropTypes.string,
  tempo: PropTypes.string,
  vol: PropTypes.number,
  playing: PropTypes.bool,
  stepState: PropTypes.object,
  currentStep: PropTypes.number,
  buffers: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedKit: makeSelectSelectedKit(),
  vol: makeSelectVol(),
  tempo: makeSelectTempo(),
  playing: makeSelectPlaying(),
  stepState: makeSelectStepState(),
  currentStep: makeSelectCurrentStep(),
  buffers: makeSelectBuffers(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeKit: evt => {
      dispatch(selectKit(evt.target.value));
    },
    onClickPlay: () => {
      dispatch(togglePlay());
    },
    onClickStep: (sound, index) => {
      dispatch(toggleStep(sound, index));
    },
    onChangeVol: evt => {
      dispatch(changeVol(evt));
    },
    onChangeTempo: evt => {
      dispatch(changeTempo(evt.target.value));
    },
    setCurrentStep: value => {
      dispatch(changeCurrentStep(value));
    },
    setBuffers: value => {
      dispatch(changeBuffers(value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DrumMachine);
