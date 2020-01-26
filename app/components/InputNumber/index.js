/**
 *
 * InputNumber
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputNumber = styled.input.attrs(props => ({
  type: 'number',
  padding: props.padding || '0.5em',
  width: props.width || '5em',
}))`
  color: black;
  border: 2px solid deepskyblue;
  border-radius: 3px;
  font-size: 1em;
  padding: ${props => props.padding};
  width: ${props => props.width};
`;

InputNumber.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.string,
};

export default InputNumber;
