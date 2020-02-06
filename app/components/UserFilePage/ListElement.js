import React, {Component} from 'react';
import ListElement from './ListElement';

class List extends Component
{
  render()
  {
    return(
      <div>
        <div>
          <h1>Your Files:</h1>
        </div>
        <div className="file-list">
          {this.props.fileList.map((file, index) => <ListElement key={index} file={file} onRemoveFile={this.props.onRemoveFile}/>)}
        </div>
        <div className="button-div">
          <button className="button-big" id="delete-all"><p className ="button-text">Deleted Selected</p></button>
          <button className="button-big" id="export-all"><p className ="button-text">Export Selected</p></button>
        </div>
      </div>);
  }
}

export default List;
