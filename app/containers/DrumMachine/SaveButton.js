import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import JWT from 'jsonwebtoken';

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

  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const onClickSave = state => {
    const jwt = localStorage.getItem('jwtToken');
    // const gen = verify(jwt);
    if (!jwt) {
      alert('Login before you can save.');
      window.location.href = '/login';
      return;
    }

    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        alert(
          'An error occurred when saving. Please try again, or log out and then back in.',
        );
        window.location.href = '/login';
        throw new Error(err);
      }

      const email = localStorage.getItem('email');

      const element = document.createElement('a');
      const stateString = JSON.stringify(state);
      const file = new Blob([stateString], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);

      const date = new Date(Date.now());
      const timestamp =
        `${date.getFullYear()}` +
        `-${`0${date.getMonth() + 1}`.slice(-2)}` +
        `-${`0${date.getDate()}`.slice(-2)}` +
        `_${`0${date.getHours()}`.slice(-2)}` +
        `-${`0${date.getMinutes()}`.slice(-2)}` +
        `-${`0${date.getSeconds()}`.slice(-2)}`;

      const params = {
        Bucket: BUCKET_NAME,
        Key: `states/${email}/${timestamp}_DrumState.json`,
        Body: file,
      };

      s3.upload(params, (error, data) => {
        if (error) {
          alert('Error saving file.');
          throw error;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        alert('Project saved.');
      });
    });
  };

  return <Save onClick={() => onClickSave(drumMachineState)}>Save</Save>;
}

// export function* verify(jwt) {
//   // const jwt = localStorage.getItem('jwtToken');
//   try {
//     const decoded = JWT.verify(jwt, process.env.JWT_SECRET);
//     console.log(decoded);
//   } catch (err) {
//     yield put(push('/login'));
//   }
// }

SaveButton.propTypes = {
  drumMachineState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  drumMachineState: makeSelectDrumMachineState(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SaveButton);
