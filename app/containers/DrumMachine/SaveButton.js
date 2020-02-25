import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

// import { useInjectReducer } from 'utils/injectReducer';
// import { makeSelectPlaying } from './selectors';
// import { togglePlay } from './actions';
// import reducer from './reducer';

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

// const key = 'drumMachine';

export default function SaveButton() {
  //   useInjectReducer({ key, reducer });
  const onClickSave = () => {
    console.log('Save Clicked!');
  };

  return <Save onClick={onClickSave}>Save</Save>;
}

SaveButton.propTypes = {};

// const mapStateToProps = createStructuredSelector({
// });

// const mapDispatchToProps = dispatch => ({
// });

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(SaveButton);
