import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import Modal from 'react-modal';
import JWT from 'jsonwebtoken';

import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectDrumMachineState,
  makeSelectIsOpenSaveButton,
} from './selectors';
import { changeIsOpenSave } from './actions';
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

const modalStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'gray',
    width: 'auto',
    maxWidth: '750px',
    height: 'auto',
    display: 'inline-block',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

const key = 'drumMachine';

let body;

export function SaveButton({
  drumMachineState,
  setIsOpenSave,
  modalIsOpenSave,
}) {
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
      body = 'Login before you can save.';
      setIsOpenSave(true);
      window.location.href = '/login';
      return;
    }

    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        body =
          'An error occurred when saving. Please try again, or log out and then back in.';
        setIsOpenSave(true);
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
          body = 'Error saving file.';
          setIsOpenSave(true);
          throw error;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        body = 'Project saved.';
        setIsOpenSave(true);
      });
    });
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpenSave(false);
  };

  return (
    <div>
      <Save onClick={() => onClickSave(drumMachineState)}>Save</Save>
      <Modal
        isOpen={modalIsOpenSave}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Save Modal"
      >
        {body}
      </Modal>
    </div>
  );
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
  setIsOpenSave: PropTypes.func,
  modalIsOpenSave: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  modalIsOpenSave: makeSelectIsOpenSaveButton(),
  drumMachineState: makeSelectDrumMachineState(),
});

const mapDispatchToProps = dispatch => ({
  setIsOpenSave: value => {
    dispatch(changeIsOpenSave(value));
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SaveButton);
