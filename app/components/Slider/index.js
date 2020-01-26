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

function Slider({ min, max, hasTooltip, width, onChange }) {
  const style = {
    width,
    margin: 10,
  };
  return (
    <div>
      {hasTooltip ? (
        <RCSlider
          style={style}
          min={min}
          max={max}
          handle={handle}
          onChange={onChange}
        />
      ) : (
        <RCSlider style={style} min={min} max={max} onChange={onChange} />
      )}
    </div>
  );
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  hasTooltip: PropTypes.bool,
  width: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  hasTooltip: false,
  width: 200,
  onChange: () => {},
};

export default Slider;
