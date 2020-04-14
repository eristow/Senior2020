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
  margin-right: 0px;
  max-width: 105px;
`;

const Load = styled.button`
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

const File = styled.button`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 4px 4px;
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

const key = 'drumMachine';
let modalString = '';
let needsLogin = false;

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
        setIsOpen(false);
        modalString = `Error: ${err}`;
        setIsOpen(true);
      } else {
        onLoad(JSON.parse(data.Body));
      }
    });
  };

  const openModal = () => {
    const jwt = localStorage.getItem('jwtToken');
    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        modalString =
          'An error occurred when loading.\nPress OK to go to Login.';
        setIsOpen(true);
        needsLogin = true;
        throw new Error(err);
      }
      const params = {
        Bucket: BUCKET_NAME,
        Delimiter: '',
        Prefix: `states/${email}/`,
      };

      s3.listObjects(params, (error, data) => {
        if (error) {
          modalString = 'Error loading projects.';
          setIsOpen(true);
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
    if (needsLogin) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    modalString = '';
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
        {modalString === '' ? (
          files.map(f => {
            if (f.Key !== 'states/') {
              return (
                <File onClick={() => onClickLoad(f.Key)} key={f.Key}>
                  {f.Key.replace(`states/${email}/`, '').replace('.json', '')}
                </File>
              );
            }
            // eslint-disable-next-line consistent-return
            return; // eslint-disable-line no-useless-return
          })
        ) : (
          <>
            <Error>{modalString}</Error>
            <OkButton onClick={closeModal}>OK</OkButton>
          </>
        )}
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
