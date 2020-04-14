/**
 *
 * H2
 *
 */

import styled from 'styled-components';

const H2 = styled.h2.attrs(props => ({
  margin: props.margin || '0px',
  textAlign: props.textAlign || 'left',
}))`
  margin: ${props => props.margin};
  font-size: 1.25em;
  color: white;
  text-align: ${props => props.textAlign};
`;

export default H2;
