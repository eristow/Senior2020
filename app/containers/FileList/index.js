import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import JWT from 'jsonwebtoken';
import Modal from 'react-modal';
import { useInjectReducer } from 'utils/injectReducer';

import FileList from './FileList';
import { makeSelectFiles } from './selectors';
import { addFiles } from './actions';
import reducer from './reducer';

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
    display: 'inline-block',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

const key = 'fileListing';

const FileListContainer = ({ files }) => {
  useInjectReducer({ key, reducer });
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  // const [files, setFiles] = useState({});
  const [modalString, setModalString] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const email = localStorage.getItem('email');
  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');
    JWT.verify(jwt, process.env.JWT_SECRET, err => {
      if (err) {
        setModalString(
          'An error occurred when loading. Please try again, or log out and then back in.',
        );
        setIsOpen(true);
        throw new Error(err);
      }
      const params = {
        Bucket: BUCKET_NAME,
        Delimiter: '',
        Prefix: `states/${email}/`,
      };

      const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET,
      });

      s3.listObjects(params, (error, data) => {
        if (error) {
          setModalString('Error loading projects.');
          setIsOpen(true);
          throw error;
        } else {
          addFiles(data.Contents);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (files === undefined || files.length === 0) {
      setIsLoading(false);
    }
  }, [files]);

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
    setModalString('');
  };

  console.log(files);
  console.log(isLoading);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Files Modal"
      >
        {modalString}
      </Modal>
      <React.Suspense fallback={<p>loading</p>}>
        {!isLoading ? <FileList files={files} /> : <p>{isLoading}</p>}
        {/* {!isLoading ? <p>not loading</p> : <p>loading</p>} */}
        {/* {JSON.stringify(files)} */}
      </React.Suspense>
    </>
  );
};

FileListContainer.propTypes = {
  files: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  files: makeSelectFiles(),
});

const mapDispatchToProps = dispatch => ({
  onAdd: files => {
    dispatch(addFiles(files));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FileListContainer);
