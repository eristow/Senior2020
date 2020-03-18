import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useInjectReducer } from 'utils/injectReducer';
import { loadState } from './actions';
import reducer from './reducer';

const Load = styled.button`
  color: #25ccf7;
  border: 2px solid #25ccf7;
  background: #eee;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 2;
  margin: 2px 4px;
  align-self: center;
  min-width: 100px;
  margin-left: auto;
`;

const key = 'drumMachine';

export function LoadButton({ onLoad }) {
  useInjectReducer({ key, reducer });

  let fileReader;

  const onClickLoad = () => {
    inputFile.current.click();
  };

  const handleFileRead = () => {
    const content = fileReader.result;
    const newState = JSON.parse(content);
    onLoad(newState);
  };

  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const inputFile = useRef(null);

  return (
    <>
      <input
        ref={inputFile}
        type="file"
        id="input"
        style={{ display: 'none' }}
        onChange={e => handleFileChosen(e.target.files[0])}
      />
      <Load onClick={onClickLoad}>Load</Load>
    </>
  );
}

LoadButton.propTypes = {
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  onLoad: value => {
    dispatch(loadState(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoadButton);
