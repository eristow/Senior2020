/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Form from './Form';
import StyledInput from './StyledInput';
import Button from '../Button/index.js';

// constructor(props){
//   super(props);
//   this.state = {username: '', pass: ''};

//   this.handleChange = this.handleChange.bind(this);
//   this.handleSubmit = this.handleSubmit.bind(this);
// }

// handleChange(event){
//   this.setState({value: event.target.value});
// }

const handleSubmit = () => {
  console.log("Hello?")
  fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      pass: pass,
    })
  })
};

function LoginForm() {
  return (
    <Form>
      <h2>Login</h2>
      {/* This doesn't work because "state" is unrecognized
      <StyledInput type="text" value={this.state.value} onChange={this.handleChange} placeholder="Username" />
      <StyledInput type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" /> */}
      
      {/* This doesn't work because there is nothing handling the input */}
      
      <StyledInput type="text" placeholder="Username" />
      <StyledInput type="password" placeholder="Password" />
      <Button onClick={handleSubmit} text="Login" />
    </Form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
