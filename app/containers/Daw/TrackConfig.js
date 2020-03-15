import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';

import Slider from 'components/Slider';
import InputText from 'components/InputText';
import { makeSelectTrackVol } from './selectors';
import {
  changeTrackVol,
  changeTrackNames,
  changeSelectedTrack,
} from './actions';
import reducer from './reducer';

const Container = styled.div`
  width: 100px;
  height: 100px;
  background: darkgray;
  border-right: 1px solid black;
`;

const Select = styled.button`
  background: linear-gradient(to bottom right, #eee, #ddd);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid black;
  border-radius: 5px;
  margin: 2px 5px;
  width: 90%;
`;

const key = 'daw';

export function TrackConfig({
  onChangeVol,
  onChangeTrackNames,
  onChangeSelectedTrack,
  name,
  num,
  vol,
}) {
  useInjectReducer({ key, reducer });

  return (
    <Container>
      <InputText
        value={name}
        onChange={e => onChangeTrackNames(num, e)}
        margin="1px"
        fontSize="0.75em"
        width="97%"
      />
      <Select type="button" onClick={() => onChangeSelectedTrack(name)}>
        Select
      </Select>
      <div>
        <Slider
          onChange={e => onChangeVol(name, e)}
          min={-60}
          max={0}
          value={vol[name]}
          width={75}
        />
      </div>
    </Container>
  );
}

TrackConfig.propTypes = {
  onChangeVol: PropTypes.func,
  onChangeTrackNames: PropTypes.func,
  onChangeSelectedTrack: PropTypes.func,
  name: PropTypes.string,
  num: PropTypes.number,
  vol: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  vol: makeSelectTrackVol(),
});

const mapDispatchToProps = dispatch => ({
  onChangeVol: (name, e) => {
    dispatch(changeTrackVol(name, e));
  },
  onChangeTrackNames: (num, e) => {
    dispatch(changeTrackNames(num, e.target.value));
  },
  onChangeSelectedTrack: name => {
    dispatch(changeSelectedTrack(name));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TrackConfig);
