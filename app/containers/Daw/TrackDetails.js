import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  height: auto;
  background: lightgray;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const Upper = styled.p`
  text-transform: uppercase;
`;

export function TrackDetails({ track }) {
  return (
    <Container>
      {track === null ? (
        <Upper>Please select a track to modify.</Upper>
      ) : (
        <Upper>{track}</Upper>
      )}
    </Container>
  );
}

TrackDetails.propTypes = {
  track: PropTypes.string,
};

export default TrackDetails;
