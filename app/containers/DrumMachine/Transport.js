import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  flex: 0 1 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: space-between;
`;

export default function Transport({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Transport.propTypes = {
  children: PropTypes.array,
};
