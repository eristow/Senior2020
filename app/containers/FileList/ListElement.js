import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';

import Checkbox from './Checkbox';
import reducer from './reducer';
import { setFilesFlag } from './actions';
import WaveImg from './WaveImg';

const videoJsOptions = {
  controls: true,
  width: '100%',
  height: 100,
  fluid: false,
  plugins: {
    wavesurfer: {
      src: 'hal.wav',
      msDisplayMax: 10,
      debug: true,
      waveColor: '#163b5b',
      progressColor: 'black',
      cursorColor: 'black',
      hideScrollbar: true,
    },
  },
};

const errorModalStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#666666',
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

const key = 'fileListing';

const ListElement = ({ dispatch, file, index, changeFilesFlag }) => {
  // var file = this.state.files.find((file) => file.id == this.props.key);
  useInjectReducer({ key, reducer });

  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  const email = localStorage.getItem('email');
  const [redirect, setRedirect] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalString, setModalString] = useState('');
  const [fileData, setFileData] = useState({});

  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const editFile = fileName => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        setErrorModalOpen(false);
        setModalString(`Error: ${err}`);
        setErrorModalOpen(true);
      } else {
        setFileData(JSON.parse(data.Body));
        setRedirect(true);
      }
    });
  };

  const deleteFile = fileName => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    s3.deleteObject(params, err => {
      if (err) {
        setErrorModalOpen(false);
        setModalString(`Error: ${err}`);
        setErrorModalOpen(true);
      }

      changeFilesFlag(true);
    });
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <div className="file-container">
      {redirect ? (
        <Redirect
          to={{
            pathname: '/',
            state: { fileData },
          }}
        />
      ) : (
        <>
          <Modal
            isOpen={errorModalOpen}
            onRequestClose={closeErrorModal}
            style={errorModalStyles}
            contentLabel="Load Modal"
          >
            <Error>{modalString}</Error>
            <OkButton onClick={closeErrorModal}>OK</OkButton>
          </Modal>
          <div className="file-listing">
            <Checkbox
              file={file}
              index={index}
              key={file.ETag}
              dispatch={dispatch}
            />
            <p className="file-name">
              {file.Key.replace(`states/${email}/`, '').replace('.json', '')}
            </p>
            <div className="file-button-div">
              <button
                type="button"
                className="file-button"
                onClick={() => editFile(file.Key)}
              >
                Edit
              </button>
              <button
                type="button"
                className="file-button"
                onClick={() => deleteFile(file.Key)}
              >
                Delete
              </button>
              <button type="button" className="file-button">
                Export
              </button>
            </div>
          </div>
          <div className="info-container">
            <b>Duration:</b> <i>{file.length}</i>
            <b> Date-Created:</b> <i>{file.dateCreated}</i>
            <WaveImg {...videoJsOptions} />
          </div>
        </>
      )}
    </div>
  );
};

ListElement.propTypes = {
  dispatch: PropTypes.func,
  file: PropTypes.object,
  index: PropTypes.number,
  changeFilesFlag: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changeFilesFlag: value => {
    dispatch(setFilesFlag(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListElement);
