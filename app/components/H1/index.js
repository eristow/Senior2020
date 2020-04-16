/**
 *
 * H1
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const H1 = styled.h1.attrs(props => ({
  marginBottom: props.marginBottom,
}))`
  font-size: 2.5em;
  color: white;
  margin-bottom: ${props => props.marginBottom};
`;

H1.propTypes = {
  marginBottom: PropTypes.string,
};

export default H1;
