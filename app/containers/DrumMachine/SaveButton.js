import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectDrumMachineState } from './selectors';
import reducer from './reducer';

const Save = styled.button`
  color: #25ccf7;
  border: 2px solid #25ccf7;
  background: #eee;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 2;
  margin: 2px 4px;
  margin-left: 10px;
  align-self: center;
  min-width: 100px;
`;

const key = 'drumMachine';

export function SaveButton({ drumMachineState }) {
  useInjectReducer({ key, reducer });

  const onClickSave = state => {
    const element = document.createElement('a');
    const stateString = JSON.stringify(state);
    const file = new Blob([stateString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'state.json';
    document.body.appendChild(element); // Required for FireFox
    element.click();
  };

  return <Save onClick={() => onClickSave(drumMachineState)}>Save</Save>;
}

SaveButton.propTypes = {
  drumMachineState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  drumMachineState: makeSelectDrumMachineState(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SaveButton);
