/**
 *
 * P
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const P = styled.p.attrs(props => ({
  marginTop: props.marginTop || '1em',
  marginBottom: props.marginBottom || '1em',
  marginLeft: props.marginLeft || '0.5em',
  marginRight: props.marginRight || '0.5em',
}))`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: inline-block;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  color: white;
`;

P.propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
};

export default P;
