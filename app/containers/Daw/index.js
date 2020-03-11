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

import Options from './Options';
import TrackConfig from './TrackConfig';

const TrackContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const key = 'daw';

const config = ['Kick', 'Snare', 'Hi Hat Closed', 'Hi Hat Open'];

export function Daw() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div>
      <Options />
      <TrackContainer>
        {config.map(t => (
          <TrackConfig name={t} />
        ))}
      </TrackContainer>
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
