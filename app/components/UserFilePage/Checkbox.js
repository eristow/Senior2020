import React, {Component} from 'react';

class Checkbox extends Component
{
  render()
  {
    return(
      <div class="checkbox-cont">
        <input className="checkbox" type="checkbox" checked={this.props.file.checked} onChange={() => this.props.onBoxChange(this.props.file)}/>
      </div>);
  }
}

export default Checkbox;
