/**
 *
 * Note
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import NoteWhite from './NoteWhite';
import NoteBlack from './NoteBlack';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// TODO: how to get FormattedMessage from props.name
// TODO: how to get audio from props.name
function Note(props) {
  return (
    <div>
      {props.color === 'white' ? (
        <NoteWhite
          style={props.style}
          onClick={() => props.onClick(props.note)}
        >
          {props.name}
          {/* <FormattedMessage {...props.name} /> */}
        </NoteWhite>
      ) : (
        <NoteBlack
          style={props.style}
          onClick={() => props.onClick(props.note)}
        >
          {props.name}
          {/* <FormattedMessage {...props.name} /> */}
        </NoteBlack>
      )}
    </div>
  );
}

Note.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  note: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Note;
