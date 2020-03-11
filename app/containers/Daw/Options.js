import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectMenuStates,
  makeSelectVol,
  makeSelectPlaying,
} from './selectors';
import { showMenu, changeVol, togglePlay } from './actions';
import reducer from './reducer';
import saga from './saga';

import Smiley from '../../images/Smiley.png';
import PlayButton from '../../images/PlayButton.png';
import StopButton from '../../images/StopButton.png';
import RecordButton from '../../images/RecordButton.png';

import P from '../../components/P';
import Slider from '../../components/Slider';
import BPMInput from './BPMInput';

const BigContainer = styled.div`
  display: flex;
  background: lightgray;
`;

const Container = styled.div`
  background: lightgray;
  display: flex;
  margin-left: auto;
  height: 50px;
`;

const TransportContainer = styled.div`
  margin-left: auto;
  order: 2;
`;

const IconContainer = styled.div`
  margin-left: auto;
  order: 2;
`;

const Menus = styled.div`
  display: flex;
  background: lightgray;
  height: 50px;
`;

const MenuContainer = styled.div``;

const MenuButton = styled.button`
  background: lightblue;
  border-radius: 5px;
  margin: 5px 5px;
  padding: 2px;
`;

const Menu = styled.div`
  background: lightgray;
  display: flex;
  flex-direction: column;
  width: 58px;
  position: absolute;
`;

const IconButton = styled.button`
  background: lightblue;
  border-radius: 5px;
  margin: 3px 3px;
  padding: 2px;
`;

const ControlText = styled.p`
  margin: 0;
  margin-left: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  user-select: none;
`;

const MasterVol = styled.div`
  margin: 0 1.25em;
`;

const key = 'daw';

export function Options({
  showMenuDispatch,
  onChangeVol,
  onClickPlay,
  menuStates,
  vol,
  playing,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onClickMenu = menuName => {
    let alreadyOpen = false;
    Object.entries(menuStates).forEach(val => {
      if (val[1] === true && val[0] !== menuName) {
        alreadyOpen = true;
      }
    });

    if (!alreadyOpen) {
      showMenuDispatch(menuName);
    }
  };

  // TODO: move Menus into a component that takes in name and menu items
  // this file is way too big
  return (
    <BigContainer>
      <Menus>
        <MenuContainer>
          <MenuButton type="button" onClick={() => onClickMenu('File')}>
            <P marginTop="0.25em" marginBottom="0.25em">
              File
            </P>
          </MenuButton>
          {menuStates.File ? (
            <Menu>
              <MenuButton type="button">Item 1</MenuButton>
              <MenuButton type="button">Item 2</MenuButton>
              <MenuButton type="button">Item 3</MenuButton>
            </Menu>
          ) : null}
        </MenuContainer>
        <MenuContainer>
          <MenuButton type="button" onClick={() => onClickMenu('Edit')}>
            <P marginTop="0.25em" marginBottom="0.25em">
              Edit
            </P>
          </MenuButton>
          {menuStates.Edit ? (
            <Menu>
              <MenuButton type="button">Item 1</MenuButton>
              <MenuButton type="button">Item 2</MenuButton>
              <MenuButton type="button">Item 3</MenuButton>
            </Menu>
          ) : null}
        </MenuContainer>
        <MenuContainer>
          <MenuButton type="button" onClick={() => onClickMenu('View')}>
            <P marginTop="0.25em" marginBottom="0.25em">
              View
            </P>
          </MenuButton>
          {menuStates.View ? (
            <Menu>
              <MenuButton type="button">Item 1</MenuButton>
              <MenuButton type="button">Item 2</MenuButton>
              <MenuButton type="button">Item 3</MenuButton>
            </Menu>
          ) : null}
        </MenuContainer>
        <MenuContainer>
          <MenuButton type="button" onClick={() => onClickMenu('Help')}>
            <P marginTop="0.25em" marginBottom="0.25em">
              Help
            </P>
          </MenuButton>
          {menuStates.Help ? (
            <Menu>
              <MenuButton type="button">Item 1</MenuButton>
              <MenuButton type="button">Item 2</MenuButton>
              <MenuButton type="button">Item 3</MenuButton>
            </Menu>
          ) : null}
        </MenuContainer>
      </Menus>
      <Container>
        <MasterVol>
          <ControlText>Master Volume</ControlText>
          <Slider
            onChange={onChangeVol}
            min={-60}
            max={0}
            value={vol}
            width={110}
          />
        </MasterVol>
        <BPMInput />
        <TransportContainer>
          <IconButton type="button" onClick={onClickPlay}>
            <img
              style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
              src={playing ? StopButton : PlayButton}
              alt="Play"
            />
          </IconButton>
          <IconButton type="button">
            <img
              style={{ marginLeft: 5, marginRight: 5, width: 36, height: 36 }}
              src={RecordButton}
              alt="Stop"
            />
          </IconButton>
        </TransportContainer>
        <IconContainer>
          {/* TODO: figure out user icon */}
          <IconButton type="button">
            <img
              style={{ marginRight: 3, width: 36, height: 36 }}
              src={Smiley}
              alt="User Icon"
            />
          </IconButton>
        </IconContainer>
      </Container>
    </BigContainer>
  );
}

Options.propTypes = {
  showMenuDispatch: PropTypes.func,
  onChangeVol: PropTypes.func,
  onClickPlay: PropTypes.func,
  menuStates: PropTypes.object,
  vol: PropTypes.number,
  playing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  menuStates: makeSelectMenuStates(),
  vol: makeSelectVol(),
  playing: makeSelectPlaying(),
});

const mapDispatchToProps = dispatch => ({
  showMenuDispatch: value => {
    dispatch(showMenu(value));
  },
  onChangeVol: value => {
    dispatch(changeVol(value));
  },
  onClickPlay: evt => {
    dispatch(togglePlay(evt.target.value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Options);
