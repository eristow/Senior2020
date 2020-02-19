/**
 *
 * LoginForm
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import Form from './Form';
// import StyledInput from './StyledInput';
// import Button from '../Button/index.js';

// constructor(props){
//   super(props);
//   this.state = {username: '', pass: ''};

//   this.handleChange = this.handleChange.bind(this);
//   this.handleSubmit = this.handleSubmit.bind(this);
// }

// handleChange(event){
//   this.setState({value: event.target.value});
// }

function LoginForm() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting Name ${username}`);

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        pass,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
      {/* <h2>Login</h2>
      <StyledInput type="text" value={this.state.value} onChange={this.handleChange} placeholder="Username" />
      <StyledInput type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" /> */}

      {/* This doesn't work because there is nothing handling the input */}

      {/* <StyledInput type="text" placeholder="Username" />
      <StyledInput type="password" placeholder="Password" /> */}
      {/* <Button onClick={handleSubmit} text="Login" /> */}
    </form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
