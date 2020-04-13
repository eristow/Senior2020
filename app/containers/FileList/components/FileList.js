import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListElement from './ListElement';
import {removeFilesByChecked} from '../actions';

class FileList extends Component
{
  render()
  {
    return(
      <div>
        <div>
          <h1>Your Files:</h1>
        </div>
        <div className="file-list">
          {this.props.files.map((file, index) => <ListElement file={file} key={index}/>)}
        </div>
		<div className="button-div">
          <button className="button-big" id="delete-all"><p className ="button-text" onClick={() => this.props.removeFilesByChecked()}>Deleted Selected</p></button>
          <button className="button-big" id="export-all"><p className ="button-text">Export Selected</p></button>
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

export default connect(mapStateToProps, {removeFilesByChecked})(FileList);
