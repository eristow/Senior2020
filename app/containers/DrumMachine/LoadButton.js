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
import { makeSelectIsOpen, makeSelectFiles } from './selectors';
import { loadState, changeIsOpen, changeFiles } from './actions';
import reducer from './reducer';

const Container = styled.div`
  display: flex;
`;

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

const File = styled.button`
  color: #25ccf7;
  border: 2px solid #25ccf7;
  background: #eee;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 2;
  margin: 4px 4px;
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

export function LoadButton({
  onLoad,
  setIsOpen,
  setFiles,
  modalIsOpen,
  files,
}) {
  useInjectReducer({ key, reducer });
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const onClickLoad = fileName => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        onLoad(JSON.parse(data.Body));
      }
    });
  };

  const openModal = () => {
    const jwt = localStorage.getItem('jwtToken');
    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        alert(
          'An error occurred when loading. Please try again, or log out and then back in.',
        );
        window.location.href = '/signout';
        throw new Error(err);
      }
      const params = {
        Bucket: BUCKET_NAME,
        Delimiter: '',
        Prefix: `states/${email}/`,
      };

      s3.listObjects(params, (error, data) => {
        if (error) {
          alert('Error loading file.');
          throw error;
        } else {
          setFiles(data.Contents);
          setIsOpen(true);
        }
      });
    });
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  const email = localStorage.getItem('email');

  return (
    <Container>
      <Load onClick={openModal}>Load</Load>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Load Modal"
      >
        {files.map(f => {
          if (f.Key !== 'states/') {
            return (
              <File onClick={() => onClickLoad(f.Key)} key={f.Key}>
                {f.Key.replace(`states/${email}/`, '').replace(
                  '_DrumState.json',
                  '',
                )}
              </File>
            );
          }
          // eslint-disable-next-line consistent-return
          return; // eslint-disable-line no-useless-return
        })}
      </Modal>
    </Container>
  );
}

LoadButton.propTypes = {
  onLoad: PropTypes.func,
  setIsOpen: PropTypes.func,
  setFiles: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  files: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  modalIsOpen: makeSelectIsOpen(),
  files: makeSelectFiles(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: value => {
    dispatch(loadState(value));
  },
  setIsOpen: value => {
    dispatch(changeIsOpen(value));
  },
  setFiles: value => {
    dispatch(changeFiles(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoadButton);
