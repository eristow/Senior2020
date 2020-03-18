import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSideBarOpen } from './selectors';
import { showSideBar } from './actions';
import reducer from './reducer';

const OpenBtn = styled.button`
  margin-bottom: 3px;
  background: lightblue;
  border-radius: 5px;
`;

const Container = styled.div`
  position: absolute;
  height: 500px;
  width: 150px;
  border: 2px solid black;
  background: lightgray;
`;

const MenuBtn = styled.button`
  margin: 10px;
  width: 85%;
  background: lightblue;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
`;

const sounds = ['Kick', 'Snare', 'Clap', 'Hi Hat Closed', 'Hi Hat Open'];

const key = 'daw';

export function SideBar({ openSideBar, sideBarOpen }) {
  useInjectReducer({ key, reducer });

  return (
    <>
      <OpenBtn type="button" onClick={openSideBar}>
        {!sideBarOpen ? '>>' : '<<'}
      </OpenBtn>
      {sideBarOpen ? (
        <Container>
          {sounds.map(sound => (
            <MenuBtn>{sound}</MenuBtn>
          ))}
        </Container>
      ) : (
        <div />
      )}
    </>
  );
}

SideBar.propTypes = {
  openSideBar: PropTypes.func,
  sideBarOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  sideBarOpen: makeSelectSideBarOpen(),
});

const mapDispatchToProps = dispatch => ({
  openSideBar: () => {
    dispatch(showSideBar());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);
