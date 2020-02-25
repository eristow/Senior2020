import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectStepState } from './selectors';
import Step from './Step';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

export function Steps({ name, stepState }) {
  return (
    <Wrapper>
      {stepState[name].map((s, i) => (
        <Step
          on={s !== 0}
          doubled={s === 2}
          index={i}
          // eslint-disable-next-line react/no-array-index-key
          key={`${name} ${i}`}
          name={name}
        />
      ))}
    </Wrapper>
  );
}

Steps.propTypes = {
  name: PropTypes.string,
  stepState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  stepState: makeSelectStepState(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Steps);
