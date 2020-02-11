/**
 *
 * DrumMachine
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H2 from 'components/H2';
import P from 'components/P';
import Slider from 'components/Slider';
import InputNumber from 'components/InputNumber';
import Dropdown from 'components/Dropdown';
import Block from 'components/Block';
// import TimePosition from 'components/TimePosition';
import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectSelectedKit,
  makeSelectVol,
  makeSelectTempo,
  makeSelectPlaying,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  selectKit,
  play,
  stop,
  toggleBlock,
  changeVol,
  changeTempo,
} from './actions';

import messages from './messages';
import Container from './Container';
import Settings from './Settings';
import Grid from './Grid';

const key = 'drumMachine';

// TODO: Update onChange/Click functions. Fix in-line styles.
export function DrumMachine({
  onChangeKit,
  onChangeVol,
  onChangeTempo,
  onClickPlay,
  onClickStop,
  selectedKit,
  vol,
  tempo,
  playing,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const blockValues = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 16; i++) {
    blockValues.push(i);
  }
  const Blocks = () => {
    const items = blockValues.map(val => <Block key={val.toString()} />);

    return <div>{items}</div>;
  };

  const StepNums = () => {
    // TODO: move to a styled-component
    const style = {
      width: '3.75em',
      height: '15px',
      float: 'left',
      margin: '3px 1px 1px',
      textAlign: 'center',
      fontSize: '12px',
    };
    // TODO: figure out this error
    const items = blockValues.map(val => (
      // <div key={val.toString()} style={style} onClick={toggleBlock}>
      <div key={val.toString()} style={style}>
        {val + 1}
      </div>
    ));

    return (
      <div style={{ display: 'inline-block', marginBottom: '0.5em' }}>
        {items}
      </div>
    );
  };

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
            <FormattedMessage {...messages.play} />
          </P>
          <Button text="Play" width="4em" onClick={onClickPlay} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <P marginTop="0.25em" marginBottom="0em">
            <FormattedMessage {...messages.stop} />
          </P>
          <Button text="Stop" width="4em" onClick={onClickStop} />
        </div>
      </Settings>
      <Grid>
        <StepNums />
        {/* TODO: figure out toggle of blocks */}
        <div style={{ display: 'inline' }}>
          <P marginTop="0em" marginBottom="0em">
            <FormattedMessage {...messages.snare} />
          </P>
          <Blocks />
        </div>
        <div style={{ display: 'inline' }}>
          <P marginTop="0em" marginBottom="0em">
            <FormattedMessage {...messages.kick} />
          </P>
          <Blocks />
        </div>
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
  onClickStop: PropTypes.func,
  selectedKit: PropTypes.string,
  tempo: PropTypes.string,
  vol: PropTypes.number,
  playing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedKit: makeSelectSelectedKit(),
  vol: makeSelectVol(),
  tempo: makeSelectTempo(),
  playing: makeSelectPlaying(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeKit: evt => {
      dispatch(selectKit(evt.target.value));
    },
    onClickPlay: () => {
      dispatch(play());
    },
    onClickStop: () => {
      dispatch(stop());
    },
    onClickBlock: evt => {
      dispatch(toggleBlock(evt.target.value));
    },
    onChangeVol: evt => {
      dispatch(changeVol(evt));
    },
    onChangeTempo: evt => {
      dispatch(changeTempo(evt.target.value));
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
