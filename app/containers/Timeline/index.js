/**
 *
 * Timeline
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import Slider from 'components/Slider';
import InputNumber from 'components/InputNumber';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTimeline, { makeSelectDropdownValue } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeDropdown } from './actions';
import messages from './messages';

const key = 'timeline';

export function Timeline({ onChangeDropdown, dropdownValue }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function log(value) {
    console.log(value);
  }

  function logButton() {
    console.log('Button Clicked');
  }

  return (
    <div>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <div>
        <p>Volume Slider</p>
        <Slider hasTooltip={false} onChange={log} />
        <p>Volume Slider With Tooltip</p>
        <Slider hasTooltip onChange={log} />
        <p>Slider With Fixed Values</p>
        <Slider min={0} max={10} onChange={log} />
        <p>Number Input</p>
        <InputNumber placeholder={0} />
        <p>Dropdown/select</p>
        <Dropdown value={dropdownValue} onChange={onChangeDropdown}>
          <option value="1" disabled>
            Select
          </option>
          <option value="2">Test</option>
          <option value="3">Test2</option>
        </Dropdown>
        <p>Button</p>
        <Button text="Play" width="4em" onClick={logButton} />
        <p>Checkbox</p>
        <p>Timeline button to select when drums play</p>
        <p>Timeline Indicator</p>
      </div>
    </div>
  );
}

Timeline.propTypes = {
  onChangeDropdown: PropTypes.func,
  dropdownValue: PropTypes.string,
  value: PropTypes.any,
  dragging: PropTypes.any,
  index: PropTypes.any,
};

Timeline.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
  dropdownValue: makeSelectDropdownValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeDropdown: evt => {
      dispatch(changeDropdown(evt.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Timeline);
