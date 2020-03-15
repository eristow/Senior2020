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
}))`
  display: inline;
  background: linear-gradient(to bottom right, #eee, #ddd);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  border: 2px solid deepskyblue;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
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
};

export default InputText;
