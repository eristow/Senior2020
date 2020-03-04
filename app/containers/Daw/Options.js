import React from 'react';
import styled from 'styled-components';

import Smiley from '../../images/Smiley.png';
import PlayButton from '../../images/PlayButton.png';
import StopButton from '../../images/StopButton.png';
import RecordButton from '../../images/RecordButton.png';

import P from '../../components/P';

const Container = styled.div`
  background: lightgray;
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

const MenuButton = styled.button`
  background: lightblue;
  border-radius: 5px;
  margin: 5px 2px;
  padding: 2px;
`;

const IconButton = styled.button`
  background: lightblue;
  border-radius: 5px;
  margin: 5px 5px;
  padding: 2px;
`;

export default function Options() {
  const FileOnClick = () => {
    console.log('FileOnClick');
  };

  const EditOnClick = () => {
    console.log('EditOnClick');
  };

  const ViewOnClick = () => {
    console.log('ViewOnClick');
  };

  const HelpOnClick = () => {
    console.log('HelpOnClick');
  };

  const PlayOnClick = () => {
    console.log('PlayOnClick');
  };

  const StopOnClick = () => {
    console.log('StopOnClick');
  };

  const RecordOnClick = () => {
    console.log('RecordOnClick');
  };

  const IconOnClick = () => {
    console.log('IconOnClick');
  };

  return (
    <Container>
      <div>
        {/* TODO: make these dropdown menus */}
        <MenuButton type="button" onClick={FileOnClick}>
          <P marginTop="0.25em" marginBottom="0.25em">
            File
          </P>
        </MenuButton>
        <MenuButton type="button" onClick={EditOnClick}>
          <P marginTop="0.25em" marginBottom="0.25em">
            Edit
          </P>
        </MenuButton>
        <MenuButton type="button" onClick={ViewOnClick}>
          <P marginTop="0.25em" marginBottom="0.25em">
            View
          </P>
        </MenuButton>
        <MenuButton type="button" onClick={HelpOnClick}>
          <P marginTop="0.25em" marginBottom="0.25em">
            Help
          </P>
        </MenuButton>
      </div>
      <TransportContainer>
        <IconButton type="button" onClick={PlayOnClick}>
          <img
            style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
            src={PlayButton}
            alt="Play"
          />
        </IconButton>
        <IconButton type="button" onClick={StopOnClick}>
          <img
            style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
            src={StopButton}
            alt="Stop"
          />
        </IconButton>
        <IconButton type="button" onClick={RecordOnClick}>
          <img
            style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
            src={RecordButton}
            alt="Stop"
          />
        </IconButton>
        {/* TODO: add BPM here */}
      </TransportContainer>
      <IconContainer>
        {/* TODO: add onClick to user icon */}
        <IconButton type="button" onClick={IconOnClick}>
          <img
            style={{ marginRight: 3, width: 36, height: 36 }}
            src={Smiley}
            alt="User Icon"
          />
        </IconButton>
      </IconContainer>
    </Container>
  );
}
