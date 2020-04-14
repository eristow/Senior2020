/**
 *
 * Piano
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Tone from 'tone';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import H2 from 'components/H2';
import Note from 'components/Note';

import makeSelectPiano from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Keyboard from './Keyboard';
import BlackNotes from './BlackNotes';
import WhiteNotes from './WhiteNotes';

export function Piano() {
  useInjectReducer({ key: 'piano', reducer });
  useInjectSaga({ key: 'piano', saga });

  let synth;

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      synth = new Tone.Synth().toMaster();
    }
    return () => {
      synth = null;
    };
  });

  function onClickNote(note) {
    synth.triggerAttackRelease(note, '16n');
  }

  return (
    <div>
      <H2>
        <FormattedMessage {...messages.piano} />
      </H2>
      <Keyboard>
        {/* TODO: better way to create keys? */}
        <BlackNotes>
          <Note name="S" note="C#4" color="black" onClick={onClickNote} />
          <Note
            style={{ marginRight: '2.75em' }}
            name="D"
            note="D#4"
            color="black"
            onClick={onClickNote}
          />
          <Note name="G" note="F#4" color="black" onClick={onClickNote} />
          <Note name="H" note="G#4" color="black" onClick={onClickNote} />
          <Note
            style={{ marginRight: '3.25em' }}
            name="J"
            note="A#4"
            color="black"
            onClick={onClickNote}
          />
          <Note name="L 2" note="C#5" color="black" onClick={onClickNote} />
          <Note
            style={{ marginRight: '2.75em' }}
            name="; 3"
            note="D#5"
            color="black"
            onClick={onClickNote}
          />
          <Note name="5" note="F#5" color="black" onClick={onClickNote} />
          <Note name="6" note="G#5" color="black" onClick={onClickNote} />
          <Note name="7" note="A#5" color="black" onClick={onClickNote} />
        </BlackNotes>
        <WhiteNotes>
          <Note name="Z" note="C4" color="white" onClick={onClickNote} />
          <Note name="X" note="D4" color="white" onClick={onClickNote} />
          <Note name="C" note="E4" color="white" onClick={onClickNote} />
          <Note name="V" note="F4" color="white" onClick={onClickNote} />
          <Note name="B" note="G4" color="white" onClick={onClickNote} />
          <Note name="N" note="A4" color="white" onClick={onClickNote} />
          <Note name="M" note="B4" color="white" onClick={onClickNote} />
          <Note name=", Q" note="C5" color="white" onClick={onClickNote} />
          <Note name=". W" note="D5" color="white" onClick={onClickNote} />
          <Note name="/ E" note="E5" color="white" onClick={onClickNote} />
          <Note name="R" note="F5" color="white" onClick={onClickNote} />
          <Note name="T" note="G5" color="white" onClick={onClickNote} />
          <Note name="Y" note="A5" color="white" onClick={onClickNote} />
          <Note name="U" note="B5" color="white" onClick={onClickNote} />
        </WhiteNotes>
      </Keyboard>
    </div>
  );
}

Piano.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  piano: makeSelectPiano(),
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

export default compose(withConnect)(Piano);

// TODO: figure out how to remove all event listeners, then add back
// TODO: put keymaps somewhere else?
/*
  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'z':
        return synth.triggerAttack('C4');
      case 's':
        return synth.triggerAttack('C#4');
      case 'x':
        return synth.triggerAttack('D4');
      case 'd':
        return synth.triggerAttack('D#4');
      case 'c':
        return synth.triggerAttack('E4');
      case 'v':
        return synth.triggerAttack('F4');
      case 'g':
        return synth.triggerAttack('F#4');
      case 'b':
        return synth.triggerAttack('G4');
      case 'h':
        return synth.triggerAttack('G#4');
      case 'n':
        return synth.triggerAttack('A4');
      case 'j':
        return synth.triggerAttack('A#4');
      case 'm':
        return synth.triggerAttack('B4');
      case ',':
      case 'q':
        return synth.triggerAttack('C5');
      case 'l':
      case '2':
        return synth.triggerAttack('C#5');
      case '.':
      case 'w':
        return synth.triggerAttack('D5');
      case ';':
      case '3':
        return synth.triggerAttack('D#5');
      case '/':
      case 'e':
        return synth.triggerAttack('E5');
      case 'r':
        return synth.triggerAttack('F5');
      case '5':
        return synth.triggerAttack('F#5');
      case 't':
        return synth.triggerAttack('G5');
      case '6':
        return synth.triggerAttack('G#5');
      case 'y':
        return synth.triggerAttack('A5');
      case '7':
        return synth.triggerAttack('A#5');
      case 'u':
        return synth.triggerAttack('B5');
      case 'i':
        return synth.triggerAttack('C6');
      case '9':
        return synth.triggerAttack('C#6');
      case 'o':
        return synth.triggerAttack('D6');
      case '0':
        return synth.triggerAttack('D#6');
      case 'p':
        return synth.triggerAttack('E6');
      case '[':
        return synth.triggerAttack('F6');
      case '=':
        return synth.triggerAttack('F#6');
      case ']':
        return synth.triggerAttack('G6');
      default:
        return synth;
    }
  });

  document.addEventListener('keyup', e => {
    switch (e.key) {
      case 'z':
      case 's':
      case 'x':
      case 'd':
      case 'c':
      case 'v':
      case 'g':
      case 'b':
      case 'h':
      case 'n':
      case 'j':
      case 'm':
      case ',':
      case 'q':
      case 'l':
      case '2':
      case '.':
      case 'w':
      case ';':
      case '3':
      case '/':
      case 'e':
      case 'r':
      case '5':
      case 't':
      case '6':
      case 'y':
      case '7':
      case 'u':
      case 'i':
      case '9':
      case 'o':
      case '0':
      case 'p':
      case '[':
      case '=':
      case ']':
        synth.triggerRelease();
        break;
      default:
    }
  });
*/
