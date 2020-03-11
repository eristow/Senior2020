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
  padding: props.padding || '0.5em',
  width: props.width || '5em',
  fontSize: props.fontSize || '1em',
}))`
  display: inline;
  background: linear-gradient(to bottom right, #666, #888);
  color: #25ccf7;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  border: 2px solid deepskyblue;
  border-radius: 3px;
  font-size: ${props => props.fontSize};
  padding: ${props => props.padding};
  width: ${props => props.width};
  margin: 0.5em 10px;
`;

InputText.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  value: PropTypes.string,
};

export default InputText;
