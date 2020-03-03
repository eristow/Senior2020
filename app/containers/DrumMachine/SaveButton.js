import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';

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

  const ID = 'AKIAILVRBXTZVKP42V7A';
  const SECRET = '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';
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const onClickSave = state => {
    const element = document.createElement('a');
    const stateString = JSON.stringify(state);
    const file = new Blob([stateString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);

    const date = new Date(Date.now());
    const timestamp = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    // element.download = `${timestamp}_DrumState.json`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: `states/${timestamp}_DrumState.json`,
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error uploading file to S3.');
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
    });

    // document.body.appendChild(element); // Required for FireFox
    // element.click();
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
