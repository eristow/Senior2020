import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';

import H1 from 'components/H1';
import ListElement from './ListElement';
import { makeSelectFiles, makeSelectCheckedFiles } from './selectors';
import { setFilesFlag, changeChecked } from './actions';
import reducer from './reducer';
// import '../styles/index.css';

const key = 'fileListing';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

const BigButton = styled.button`
  color: lightcoral;
  border: 2px solid lightcoral;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 5px;
  font-size: 22px;
  border-radius: 4px;
  margin: 2px 2px;
  align-self: center;
  min-width: 100px;

  &:active {
    background: lightcoral;
    color: white;
  }

  &: disabled {
    opacity: 40%;
  }
`;

const FileList = ({
  files,
  checkedFiles,
  changeFilesFlag,
  setCheckedFiles,
}) => {
  useInjectReducer({ key, reducer });

  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalString, setModalString] = useState('');

  useEffect(() => {
    // This is so the useEffect re-renders on files changing.
    // eslint-disable-next-line no-unused-vars
    const a = 0;
  }, [files]);

  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;
  const BUCKET_NAME = 'web-daw';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const deleteFiles = () => {
    const toDelete = [];
    let newChecked = Object.assign({}, checkedFiles);

    Object.keys(checkedFiles).forEach(i => {
      toDelete.push({ Key: files[i].Key });
      const { [i]: omit, ...copyChecked } = newChecked;
      newChecked = copyChecked;
    });

    setCheckedFiles(newChecked);

    const params = {
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: toDelete,
      },
    };

    s3.deleteObjects(params, err => {
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
    <Container>
      <Modal
        isOpen={errorModalOpen}
        onRequestClose={closeErrorModal}
        style={errorModalStyles}
        contentLabel="Load Modal"
      >
        <Error>{modalString}</Error>
        <OkButton onClick={closeErrorModal}>OK</OkButton>
      </Modal>
      <H1 marginBottom="0px">Your Files:</H1>
      <div className="file-list">
        {files.map((file, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListElement file={file} index={index} key={index} />
        ))}
      </div>
      <div>
        <BigButton
          type="button"
          disabled={
            Object.keys(checkedFiles).length === 0 &&
            checkedFiles.constructor === Object
          }
          onClick={() => deleteFiles()}
        >
          <p>Deleted Selected</p>
        </BigButton>
        {/* <button type="button" className="button-big" id="export-all">
          <p className="button-text">Export Selected</p>
        </button> */}
      </div>
    </Container>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  checkedFiles: PropTypes.object,
  changeFilesFlag: PropTypes.func,
  setCheckedFiles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  files: makeSelectFiles(),
  checkedFiles: makeSelectCheckedFiles(),
});

const mapDispatchToProps = dispatch => ({
  changeFilesFlag: value => {
    dispatch(setFilesFlag(value));
  },
  setCheckedFiles: value => {
    dispatch(changeChecked(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FileList);
