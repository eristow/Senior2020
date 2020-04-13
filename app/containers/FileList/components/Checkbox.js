import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeBoxSelection} from '../actions';

class Checkbox extends Component
{
  render()
  {
  var file = this.props.file;
	return(
      <div>
        <label className="checkbox-cont">
          <input type="checkbox" value={file.checked} onChange={() => this.props.changeBoxSelection(this.props.file.id)}/>
          <span className="fake-check"></span>
        </label>
      </div>);
  }
}

function mapStateToProps(state)
{
	return {
		files: state.files,
	};
}

export default connect(mapStateToProps, {changeBoxSelection})(Checkbox);
