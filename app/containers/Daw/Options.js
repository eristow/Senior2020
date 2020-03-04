import React from 'react';
import styled from 'styled-components';

import Smiley from '../../images/Smiley.png';
import PlayButton from '../../images/PlayButton.png';
import StopButton from '../../images/StopButton.png';
import RecordButton from '../../images/RecordButton.png';

import P from '../../components/P';

const Container = styled.div`
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TransportContainer = styled.div`
  margin-left: auto;
  order: 2;
`;

const IconContainer = styled.div`
  margin-left: auto;
  order: 2;
`;

export default function Options() {
  return (
    <Container>
      <div>
        {/* TODO: make these dropdown menus */}
        <P marginTop="0.5em" marginBottom="0.5em">
          File
        </P>
        <P marginTop="0.5em" marginBottom="0.5em">
          Edit
        </P>
        <P marginTop="0.5em" marginBottom="0.5em">
          View
        </P>
        <P marginTop="0.5em" marginBottom="0.5em">
          Help
        </P>
      </div>
      <TransportContainer>
        <img
          style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
          src={PlayButton}
          alt="Play"
        />
        <img
          style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
          src={StopButton}
          alt="Stop"
        />
        <img
          style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
          src={RecordButton}
          alt="Stop"
        />
        {/* TODO: add BPM here */}
      </TransportContainer>
      <IconContainer>
        {/* TODO: add onClick to user icon */}
        <img
          style={{ marginRight: 3, width: 36, height: 36 }}
          src={Smiley}
          alt="User Icon"
        />
      </IconContainer>
    </Container>
  );
}
