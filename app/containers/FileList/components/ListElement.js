import React, {Component} from 'react';
import {connect} from 'react-redux';
import Checkbox from './Checkbox';
import {removeFileById} from '../actions';
import WaveImg from './WaveImg';

const videoJsOptions = {
    controls: true,
    width: "100%",
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
            hideScrollbar: true
        }
    }
};

class ListElement extends Component
{
  render()
  {
	//var file = this.state.files.find((file) => file.id == this.props.key);
	var file = this.props.file;
    return (
      <div className="file-container">
      <div className="file-listing">
        <Checkbox file={file} key={file.id}/>
        <p className="file-name">{file.name}</p>
        <div className="file-button-div">
        <button className="file-button">Edit</button>
        <button className="file-button" onClick={() => this.props.removeFileById(file.id)}>Delete</button>
        <button className="file-button">Export</button>
        </div>
      </div>
      <div className="info-container">
      <b>Duration:</b> <i>{file.length}</i>
      <b> Date-Created:</b> <i>{file.dateCreated}</i>
	  <WaveImg { ...videoJsOptions}/>
      </div>
    </div>);
  }
}

function mapStateToProps(state)
{
	return {
		files: state.files
	};
}

export default connect(mapStateToProps, {removeFileById})(ListElement);
