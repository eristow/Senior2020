import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export default function Transport({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Transport.propTypes = {
  children: PropTypes.array,
};
