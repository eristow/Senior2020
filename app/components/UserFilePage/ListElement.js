import React, {Component} from 'react';

class ListElement extends Component
{
  render()
  {
    const file = this.props.file;
    return (
      <div class="file-container">
      <div class="file-listing">
        <input class="checkbox" type="checkbox"/>
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
