import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import AWS from 'aws-sdk';
import Modal from 'react-modal';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoadUrl, makeSelectIsOpen } from './selectors';
import { loadState, changeLoadUrl, changeIsOpen } from './actions';
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

const URL = styled.input`
  margin: 10px;
  margin-left: auto;
  width: auto;
`;

const modalStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const key = 'drumMachine';

export function LoadButton({
  onLoad,
  onChangeLoadUrl,
  setIsOpen,
  loadUrl,
  modalIsOpen,
}) {
  useInjectReducer({ key, reducer });

  // const ID = process.env.AWS_ID;
  // const SECRET = process.env.AWS_SECRET;
  // const BUCKET_NAME = 'web-daw';

  // const s3 = new AWS.S3({
  //   accessKeyId: ID,
  //   secretAccessKey: SECRET,
  // });

  const onClickLoad = () => {
    fetch(loadUrl)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        onLoad(data);
      })
      .catch(error => console.log(`Failed because: ${error}`));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

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
        <URL
          type="text"
          placeholder="Load URL"
          value={loadUrl}
          onChange={onChangeLoadUrl}
        />
        <Load onClick={onClickLoad}>Load</Load>
      </Modal>
    </Container>
  );
}

LoadButton.propTypes = {
  onLoad: PropTypes.func,
  onChangeLoadUrl: PropTypes.func,
  setIsOpen: PropTypes.func,
  loadUrl: PropTypes.string,
  modalIsOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loadUrl: makeSelectLoadUrl(),
  modalIsOpen: makeSelectIsOpen(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: value => {
    dispatch(loadState(value));
  },
  onChangeLoadUrl: evt => {
    dispatch(changeLoadUrl(evt.target.value));
  },
  setIsOpen: value => {
    dispatch(changeIsOpen(value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoadButton);
