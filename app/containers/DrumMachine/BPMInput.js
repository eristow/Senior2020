import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectBpm } from './selectors';
import { changeBpm } from './actions';
import reducer from './reducer';

const BPM = styled.input`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  font-size: 18px;
  background: #ffffff00;
  padding: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border-radius: 4px;
  width: 5em;
`;

const key = 'drumMachine';

export function BPMInput({ bpm, setBpm }) {
  useInjectReducer({ key, reducer });
  return <BPM type="number" value={bpm} min="50" max="180" onChange={setBpm} />;
}

BPMInput.propTypes = {
  bpm: PropTypes.string,
  setBpm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bpm: makeSelectBpm(),
});

const mapDispatchToProps = dispatch => ({
  setBpm: evt => {
    dispatch(changeBpm(evt.target.value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BPMInput);
