/**
 *
 * Checkbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import P from '../P';
import StyledCheckbox from './StyledCheckbox';

function Checkbox(props) {
  return (
    <div>
      <StyledCheckbox />
      <P>{props.text}</P>
    </div>
  );
}

Checkbox.propTypes = {
  text: PropTypes.string,
};

export default Checkbox;
