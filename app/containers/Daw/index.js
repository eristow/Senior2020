/**
 *
 * Daw
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDaw from './selectors';
import reducer from './reducer';
import saga from './saga';

import H1 from '../../components/H1';
import Options from './Options';

export function Daw() {
  useInjectReducer({ key: 'daw', reducer });
  useInjectSaga({ key: 'daw', saga });

  return (
    <div>
      <H1>DAW</H1>
      <Options />
    </div>
  );
}

Daw.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  daw: makeSelectDaw(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Daw);
