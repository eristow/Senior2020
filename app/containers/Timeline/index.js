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
import P from 'components/P';
import Slider from 'components/Slider';
import InputNumber from 'components/InputNumber';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectDropdownValue } from './selectors';
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
        <P>Volume Slider</P>
        <Slider hasTooltip={false} onChange={log} />
        <P>Volume Slider With Tooltip</P>
        <Slider hasTooltip onChange={log} />
        <P>Slider With Fixed Values</P>
        <Slider min={0} max={10} onChange={log} />
        <P>Number Input</P>
        <InputNumber placeholder={0} />
        <br />
        <P>Dropdown/select</P>
        <Dropdown value={dropdownValue} onChange={onChangeDropdown}>
          <option value="1" disabled>
            Select
          </option>
          <option value="2">Test</option>
          <option value="3">Test2</option>
        </Dropdown>
        <br />
        <P>Button</P>
        <Button text="Play" width="4em" onClick={logButton} />
        <Checkbox text="Checkbox" />
        <P>Timeline button to select when drums play</P>
        <br />
        <P>Timeline Indicator</P>
      </div>
    </div>
  );
}

Timeline.propTypes = {
  dispatch: PropTypes.func,
  onChangeDropdown: PropTypes.func,
  dropdownValue: PropTypes.string,
  value: PropTypes.any,
  dragging: PropTypes.any,
  index: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
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
