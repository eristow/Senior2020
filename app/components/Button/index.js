/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './StyledButton';

function Button(props) {
  return (
    <StyledButton
      onClick={props.onClick}
      width={props.width}
      height={props.height}
    >
      {props.text}
    </StyledButton>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
