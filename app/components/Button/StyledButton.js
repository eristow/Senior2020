import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button.attrs(props => ({
  width: props.width || '8em',
  height: props.height || '3em',
}))`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid deepskyblue;
  color: deepskyblue;
  background: white;
  width: ${props => props.width};
  height: ${props => props.height};

  &:active {
    background: deepskyblue;
    color: white;
  }
`;

StyledButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default StyledButton;
