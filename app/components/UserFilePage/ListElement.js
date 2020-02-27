import React, {Component} from 'react';
import Checkbox from './Checkbox';

class ListElement extends Component
{
  render()
  {
    var file = this.props.file;
    return (
      <div class="file-container">
      <div class="file-listing">
        <Checkbox file={this.props.file} onBoxChange={this.props.onBoxChange}/>
        <p class="file-name">{this.props.file.name}</p>
        <div class="file-button-div">
        <button class="file-button">Edit</button>
        <button class="file-button" onClick={() => this.props.onRemoveFile(file)}>Delete</button>
        <button class="file-button">Export</button>
        </div>
      </div>
      <div class="info-container">
      <b>Duration:</b> <i>{this.props.file.length}</i>
      <b> Date-Created:</b> <i>{this.props.file.dateCreated}</i>
      </div>
    </div>);
  }
}

export default ListElement;
