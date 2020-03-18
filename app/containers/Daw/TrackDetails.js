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

export function TrackDetails({ track }) {
  const objIsEmpty = obj =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

  return (
    <Container>
      {objIsEmpty(track) ? (
        <p>Please select a track to modify.</p>
      ) : (
        <p>{track.name}</p>
      )}
    </Container>
  );
}

TrackDetails.propTypes = {
  track: PropTypes.object,
};

export default TrackDetails;
