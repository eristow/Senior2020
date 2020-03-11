import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';

import Slider from 'components/Slider';
import { makeSelectTrackVol } from './selectors';
import { changeTrackVol } from './actions';
import reducer from './reducer';

const Container = styled.div`
  width: 100px;
  background: darkgray;
  border: 2px black;
  border-radius: 5px;
  margin-bottom: 1px;
`;

const Title = styled.p`
  user-select: none;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: inline-block;
  margin: 0.1em 0.5em;
`;

const key = 'daw';

export function TrackConfig({ onChangeVol, name, vol }) {
  useInjectReducer({ key, reducer });

  return (
    <Container>
      <Title>{name}</Title>
      <div>
        <Slider
          onChange={e => onChangeVol(name, e)}
          min={-60}
          max={0}
          value={vol[name]}
          width={50}
        />
      </div>
    </Container>
  );
}

TrackConfig.propTypes = {
  onChangeVol: PropTypes.func,
  name: PropTypes.string,
  vol: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  vol: makeSelectTrackVol(),
});

const mapDispatchToProps = dispatch => ({
  onChangeVol: (name, e) => {
    dispatch(changeTrackVol(name, e));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TrackConfig);
