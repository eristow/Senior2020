/**
 *
 * Timeline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Timeline() {
  useInjectReducer({ key: 'timeline', reducer });
  useInjectSaga({ key: 'timeline', saga });

  return (
    <div>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </div>
  );
}

Timeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
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

export default compose(withConnect)(Timeline);
