import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import AWS from 'aws-sdk';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoadUrl } from './selectors';
import { loadState, changeLoadUrl } from './actions';
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
`;

const URL = styled.input`
  margin: 10px;
  margin-left: auto;
  width: auto;
`;

const key = 'drumMachine';

export function LoadButton({ onLoad, onChangeLoadUrl, loadUrl }) {
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

  return (
    <Container>
      <URL
        type="text"
        placeholder="Load URL"
        value={loadUrl}
        onChange={onChangeLoadUrl}
      />
      <Load onClick={onClickLoad}>Load</Load>
    </Container>
  );
}

LoadButton.propTypes = {
  onLoad: PropTypes.func,
  onChangeLoadUrl: PropTypes.func,
  loadUrl: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loadUrl: makeSelectLoadUrl(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: value => {
    dispatch(loadState(value));
  },
  onChangeLoadUrl: evt => {
    dispatch(changeLoadUrl(evt.target.value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoadButton);
