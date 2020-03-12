import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Slider from 'components/Slider';
import { makeSelectTrackVol } from './selectors';
import { changeTrackVol } from './actions';
import reducer from './reducer';

import Steps from './Steps';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Info = styled.div`
  flex: 0 0 155px;
  background: linear-gradient(#555, #666);
  border: 1px solid #555;
`;

const Name = styled.h2`
  color: white;
  font-size: 14px;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
`;

const key = 'drumMachine';

export function Track({
  onChangeTrackVol,
  buffer,
  name,
  setBuffers,
  trackVol,
}) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    // I don't know if there's a better way to do this to make eslint happy
    // eslint-disable-next-line no-param-reassign
    buffer.volume.value = trackVol[name];
  }, [trackVol]);

  useEffect(() => {
    setBuffers(buffers => ({
      ...buffers,
      [name]: buffer,
    }));
  }, [buffer]);

  return (
    <Wrapper>
      <Info>
        <Name>{name}</Name>
        <Slider
          onChange={e => onChangeTrackVol(name, e)}
          min={-55}
          max={0}
          value={trackVol[name]}
          width={120}
        />
      </Info>
      <Steps name={name} />
    </Wrapper>
  );
}

Track.propTypes = {
  onChangeTrackVol: PropTypes.func,
  buffer: PropTypes.object,
  name: PropTypes.string,
  setBuffers: PropTypes.func,
  trackVol: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  trackVol: makeSelectTrackVol(),
});

const mapDispatchToProps = dispatch => ({
  onChangeTrackVol: (name, evt) => {
    dispatch(changeTrackVol(name, evt));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Track);
