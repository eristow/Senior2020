import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import { removeFileById } from './actions';
import WaveImg from './WaveImg';

const videoJsOptions = {
  controls: true,
  width: '100%',
  height: 100,
  fluid: false,
  plugins: {
    wavesurfer: {
      src: 'hal.wav',
      msDisplayMax: 10,
      debug: true,
      waveColor: '#163b5b',
      progressColor: 'black',
      cursorColor: 'black',
      hideScrollbar: true,
    },
  },
};

const ListElement = ({ file, removeFile }) => (
  // var file = this.state.files.find((file) => file.id == this.props.key);
  <div className="file-container">
    <div className="file-listing">
      <Checkbox file={file} key={file.id} />
      <p className="file-name">{file.name}</p>
      <div className="file-button-div">
        <button type="button" className="file-button">
          Edit
        </button>
        <button
          type="button"
          className="file-button"
          onClick={() => removeFile(file.id)}
        >
          Delete
        </button>
        <button type="button" className="file-button">
          Export
        </button>
      </div>
    </div>
    <div className="info-container">
      <b>Duration:</b> <i>{file.length}</i>
      <b> Date-Created:</b> <i>{file.dateCreated}</i>
      <WaveImg {...videoJsOptions} />
    </div>
  </div>
);

ListElement.propTypes = {
  file: PropTypes.object,
  removeFile: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  removeFile: id => {
    dispatch(removeFileById(id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListElement);
