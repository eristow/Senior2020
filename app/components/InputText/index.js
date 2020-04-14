/**
 *
 * InputText
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputText = styled.input.attrs(props => ({
  type: 'text',
  value: props.value,
  defaultValue: props.defaultValue,
  padding: props.padding || '0.5em',
  margin: props.margin || '0.5em 10px',
  width: props.width || '5em',
  fontSize: props.fontSize || '1em',
  transform: props.transform || 'lowercase',
}))`
  display: inline;
  background: #ffffffea;
  color: black;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: ${props => props.transform};
  border: 2px solid deepskyblue;
  border-radius: 3px;
  font-size: ${props => props.fontSize};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
`;

InputText.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  transform: PropTypes.string,
};

export default InputText;
