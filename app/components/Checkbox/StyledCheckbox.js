import styled from 'styled-components';
// import PropTypes from 'prop-types';

const StyledCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  margin: 0em 0.5em;
`;

StyledCheckbox.propTypes = {};

export default StyledCheckbox;
