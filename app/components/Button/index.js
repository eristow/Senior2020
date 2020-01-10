/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// TODO: change to saved sample
function onClick(name, note) {
  const synth = new Tone.Synth().toMaster();
  // console.log(`Button clicked: ${name} ${note}`);
  synth.triggerAttackRelease(note, '8n');
}

// TODO: how to get FormattedMessage from props.name
// TODO: how to get audio from props.name
function Button(props) {
  return (
    <div>
      <button type="button" onClick={() => onClick(props.name, props.note)}>
        {props.name}
        {/* <FormattedMessage {...props.name} /> */}
      </button>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.any,
  note: PropTypes.string,
};

export default Button;
