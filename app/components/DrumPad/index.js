/**
 *
 * DrumPad
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Pad from './Pad';

function DrumPad(props) {
  const audio = new Audio(props.src);

  const handleClick = () => {
    audio.play();
  };

  return (
    <div>
      <Pad onClick={handleClick}>{props.name}</Pad>
    </div>
  );
}

DrumPad.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
};

export default DrumPad;
