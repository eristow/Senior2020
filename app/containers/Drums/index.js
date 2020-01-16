/**
 *
 * Drums
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import H2 from 'components/H2';
import DrumPad from 'components/DrumPad';

import makeSelectDrums from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import DrumsContainer from './DrumsContainer';

export function Drums() {
  useInjectReducer({ key: 'drums', reducer });
  useInjectSaga({ key: 'drums', saga });

  return (
    <div>
      <H2>
        <FormattedMessage {...messages.drums} />
      </H2>
      <DrumsContainer>
        <DrumPad
          name="Kick"
          src="https://senior-project-20.s3.us-east-2.amazonaws.com/kick.wav"
        />
        <DrumPad
          name="Snare"
          src="https://senior-project-20.s3.us-east-2.amazonaws.com/snare2.wav"
        />
      </DrumsContainer>
    </div>
  );
}

Drums.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  drums: makeSelectDrums(),
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

export default compose(withConnect)(Drums);
