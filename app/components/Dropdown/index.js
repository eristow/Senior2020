/**
 *
 * Dropdown
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dropdown = styled.select.attrs(props => ({
  padding: props.padding || '0.5em',
  width: props.width || '10em',
}))`
  display: block;
  background: white;
  border: 2px solid deepskyblue;
  border-radius: 3px;
  font-size: 1em;
  padding: ${props => props.padding};
  width: ${props => props.width};
  margin-right: 0.75em;
`;

Dropdown.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.string,
};

export default Dropdown;
