/**
 *
 * Note
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
// import styled from 'styled-components';

import NoteWhite from './NoteWhite';
import NoteBlack from './NoteBlack';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// TODO: change to saved sample
function onClick(name, note) {
  const synth = new Tone.Synth().toMaster();
  // console.log(`Button clicked: ${name} ${note}`);
  synth.triggerAttackRelease(note, '16n');
}

// TODO: how to get FormattedMessage from props.name
// TODO: how to get audio from props.name
function Note(props) {
  return (
    <div>
      {props.color === 'white' ? (
        <NoteWhite onClick={() => onClick(props.name, props.note)}>
          {props.name}
          {/* <FormattedMessage {...props.name} /> */}
        </NoteWhite>
      ) : (
        <NoteBlack onClick={() => onClick(props.name, props.note)}>
          {props.name}
          {/* <FormattedMessage {...props.name} /> */}
        </NoteBlack>
      )}
    </div>
  );
}

Note.propTypes = {
  name: PropTypes.string,
  note: PropTypes.string,
  color: PropTypes.string,
};

export default Note;
