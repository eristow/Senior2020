import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import Modal from 'react-modal';
import JWT from 'jsonwebtoken';

import { useInjectReducer } from 'utils/injectReducer';
import { changeIsOpenSave } from './actions';
import {
  makeSelectDrumMachineState,
  makeSelectTitle,
  makeSelectIsOpenSaveButton,
} from './selectors';
import reducer from './reducer';

const Save = styled.button`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 2px 2px;
  align-self: center;
  min-width: 100px;

  &:active {
    background: deepskyblue;
    color: white;
  }
`;

const OkButton = styled.button`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 2px 2px;
  align-self: center;
  min-width: 100px;

  &:active {
    background: deepskyblue;
    color: white;
  }
`;

const Error = styled.p`
  color: #eeeeee;
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
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

const key = 'drumMachine';

// let body;
let needsLogin = false;

export function SaveButton({
  drumMachineState,
  // setIsOpenSave,
  // modalIsOpenSave,
  title,
}) {
  useInjectReducer({ key, reducer });
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  const [modalString, setModalString] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showOk, setShowOk] = useState(false);

  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const onClickSave = state => {
    setModalString('Saving.');
    setShowOk(false);
    setModalIsOpen(true);

    const jwt = localStorage.getItem('jwtToken');
    // const gen = verify(jwt);
    if (!jwt) {
      setModalString('Login before you can save.\nPress OK to go to Login.');
      needsLogin = true;
      setShowOk(true);
      setModalIsOpen(true);
      return;
    }

    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        setModalString(
          'An error occurred when saving. Please try again, or log out and then back in.',
        );
        setShowOk(true);
        setModalIsOpen(true);
        window.location.href = '/login';
        throw new Error(err);
      }

      if (title === '') {
        setModalString('Cannot save a project with a blank title.');
        setShowOk(true);
        setModalIsOpen(true);
        return;
      }

      if (title.toLowerCase() === 'banger') {
        setModalString('Cannot save a project with a title of "banger"');
        setShowOk(true);
        setModalIsOpen(true);
        return;
      }

      const email = localStorage.getItem('email');

      const element = document.createElement('a');
      const stateString = JSON.stringify(state);
      const file = new Blob([stateString], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);

      // const date = new Date(Date.now());
      // const timestamp =
      //   `${date.getFullYear()}` +
      //   `-${`0${date.getMonth() + 1}`.slice(-2)}` +
      //   `-${`0${date.getDate()}`.slice(-2)}` +
      //   `_${`0${date.getHours()}`.slice(-2)}` +
      //   `-${`0${date.getMinutes()}`.slice(-2)}` +
      //   `-${`0${date.getSeconds()}`.slice(-2)}`;

      const params = {
        Bucket: BUCKET_NAME,
        Key: `states/${email}/${title.trim()}.json`,
        Body: file,
      };

      // s3.upload(params, (error, data) => {
      s3.upload(params, error => {
        if (error) {
          setModalString('Error saving file.');
          setShowOk(true);
          setModalIsOpen(true);
          throw error;
        }
        // console.log(`File uploaded successfully. ${data.Location}`);
        setModalIsOpen(true);
        setShowOk(true);
        setModalString('Project saved.');
      });
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (needsLogin) window.location.href = '/login';
    setModalString('');
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Save Modal"
      >
        <Error>{modalString}</Error>
        {showOk ? <OkButton onClick={closeModal}>OK</OkButton> : <></>}
      </Modal>
      <Save onClick={() => onClickSave(drumMachineState)}>Save</Save>
    </>
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
  title: PropTypes.string,
  // setIsOpenSave: PropTypes.func,
  // modalIsOpenSave: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modalIsOpenSave: makeSelectIsOpenSaveButton(),
  drumMachineState: makeSelectDrumMachineState(),
  title: makeSelectTitle(),
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
