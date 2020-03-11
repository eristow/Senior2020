/**
 *
 * Slider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import RCSlider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
// import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const handle = ({ value, dragging, index, ...restProps }) => (
  <Tooltip
    prefixCls="rc-slider-tooltip"
    overlay={value}
    visible={dragging}
    placement="top"
    align={{
      offset: [0, -5],
    }}
    key={index}
  >
    <Handle value={value} {...restProps} />
  </Tooltip>
);

function Slider({
  min,
  max,
  defaultValue,
  value,
  hasTooltip,
  width,
  height,
  onChange,
  vertical,
}) {
  const style = {
    width,
    height,
    margin: '0.5em 0.5em',
  };
  return (
    <div style={{ display: 'inline-block' }}>
      {hasTooltip ? (
        <RCSlider
          style={style}
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          handle={handle}
          onChange={onChange}
          vertical={vertical}
        />
      ) : (
        <RCSlider
          style={style}
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          vertical={vertical}
        />
      )}
    </div>
  );
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  hasTooltip: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  vertical: PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  defaultValue: 0,
  hasTooltip: false,
  width: 5,
  height: 5,
  onChange: () => {},
  vertical: false,
};

export default Slider;
