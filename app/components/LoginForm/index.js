/**
 *
 * LoginForm
 *
 */

import React, { useState } from 'react';
import pianoReducer from 'containers/Piano/reducer';
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

  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://localhost:8080/api/auth/login';

  const handleSubmit = evt => {
    evt.preventDefault();
    // alert(`Submitting Name ${username}`);

    fetch(targetUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        pass,
      }),
    })
      .then(results => results.json())
      .then(data => {
        // let res = data.results.map((token) => {
        //   return(
        //     <div key={token.results}>
        //       <p src={token.res.token} />

        //     </div>
        //   )
        // })
        console.log(data);
        if (data.token) alert(`Login Successful!`);
        else alert(`Either the Username or Password is Wrong`);
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
      <br />
      <label>
        Password:
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
      {/* <h2>Login</h2>
      <StyledInput type="text" value={this.state.value} onChange={this.handleChange} placeholder="Username" />
      <StyledInput type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" /> */}
      {/* This doesn't work because there is nothing handling the input */}
      {/* <StyledInput type="text" placeholder="Username" />
      <StyledInput type="password" placeholder="Password" /> */}
      {/* <Button onClick={handleSubmit} text="Login" /> */}
      <br />
      <p>
        Don't have an account? Click&nbsp;
        <a href="/register">here</a>
      </p>
    </form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
