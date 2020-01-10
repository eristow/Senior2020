/**
 *
 * Timeline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import Note from 'components/Note';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Keyboard from './Keyboard';
import WhiteNotes from './WhiteNotes';
import BlackNotes from './BlackNotes';

export function Timeline() {
  useInjectReducer({ key: 'timeline', reducer });
  useInjectSaga({ key: 'timeline', saga });

  return (
    <div>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      {/* <Note name={messages.kick} note="C4" />
      <Note name={messages.snare} note="Db4" />
      <Note name={messages.hat} note="D4" /> */}
      {/* TODO: move keyboard/black/white to own component? */}
      <Keyboard>
        <BlackNotes>
          <Note name="Db4" note="Db4" color="black" />
          <Note name="Eb4" note="Eb4" color="black" />
          <Note name="Gb4" note="Gb4" color="black" />
          <Note name="Ab4" note="Ab4" color="black" />
          <Note name="Bb4" note="Bb4" color="black" />
        </BlackNotes>
        <WhiteNotes>
          <Note name="C4" note="C4" color="white" />
          <Note name="D4" note="D4" color="white" />
          <Note name="E4" note="E4" color="white" />
          <Note name="F4" note="F4" color="white" />
          <Note name="G4" note="G4" color="white" />
          <Note name="A4" note="A4" color="white" />
          <Note name="B4" note="B4" color="white" />
        </WhiteNotes>
      </Keyboard>
    </div>
  );
}

Timeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Timeline);
