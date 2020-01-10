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

import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Timeline() {
  useInjectReducer({ key: 'timeline', reducer });
  useInjectSaga({ key: 'timeline', saga });

  // TODO: create dataStruc of buttons with diff names passed in to them as props
  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      {/* <Button name={messages.kick} note="C4" />
      <Button name={messages.snare} note="Db4" />
      <Button name={messages.hat} note="D4" /> */}
      <Button name="kick" note="C4" />
      <Button name="snare" note="Db4" />
      <Button name="hat" note="D4" />
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
