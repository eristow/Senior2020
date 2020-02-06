//I was rendering my list page by passing this main component into
//index.js to be dom-rendered. Not really sure how to do that on here lol.
//This also includes the dummy data for the list element instances which I
//put in for demo purposes. 


import React, {Component} from 'react';
import List from './List';

class Main extends Component
{
  constructor()
  {
    super();
    this.state =
    {
      fileList:
      [
        {
          id: "0",
          name: "file1",
          contents: "",
          length: 5,
          dateCreated: "2/1/19"
        },
        {
          id: "1",
          name: "file2",
          contents: "",
          length: 10,
          dateCreated: "3/4/19"
        },
        {
          id: "2",
          name: "file3",
          contents: "",
          length: 2,
          dateCreated: "5/17/19"
        },
        {
          id: "3",
          name: "file4",
          contents: "",
          length: 6,
          dateCreated: "8/11/19"
        },
        {
          id: "4",
          name: "file5",
          contents: "",
          length: 8,
          dateCreated: "1/21/20"
        },
      ]
    };
    this.removeFile = this.removeFile.bind(this);
  }

  removeFile(fileRemoved)
  {
    this.setState((state) => ({
      fileList: this.state.fileList.filter(file => file !== fileRemoved)
    }))
  }

  render()
  {
    return (
      <div>
        <List fileList={this.state.fileList} onRemoveFile = {this.removeFile}/>
      </div>);
  }
}

export default Main;
