import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectPlaying } from './selectors';
import { togglePlay } from './actions';
import reducer from './reducer';

const Play = styled.button`
  border: 2px solid ${props => (props.on === false ? '#0BA134' : '#FD7272')};
  border: 2px solid #ddd;
  color: #fff;
  background: ${props => (props.on === false ? '#0BA134' : '#FD7272')};
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 2px 4px;
  margin-left: 6px;
  align-self: center;
  min-width: 100px;

  &:active {
    color: ${props => (props.on === false ? '#0BA134' : '#FD7272')};
    background: #666666;
  }
`;

const key = 'drumMachine';

export function PlayButton({ playing, onClickPlay }) {
  useInjectReducer({ key, reducer });
  return (
    <Play on={playing} onClick={onClickPlay}>
      {playing ? 'Stop' : 'Play'}
    </Play>
  );
}

PlayButton.propTypes = {
  playing: PropTypes.bool,
  onClickPlay: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  playing: makeSelectPlaying(),
});

const mapDispatchToProps = dispatch => ({
  onClickPlay: evt => {
    dispatch(togglePlay(evt.target.value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PlayButton);
