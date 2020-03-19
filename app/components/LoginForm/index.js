/**
 *
 * LoginForm
 *
 */

import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // http://localhost:8080
  const targetUrl = '/api/auth/login';

  const handleSubmit = evt => {
    evt.preventDefault();
    // alert(`Submitting Name ${Email}`);

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      fetch(targetUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
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
          else alert(`Either the Email or Password is Wrong`);
        });
    } else {
      alert(`Either the Email or Password is Wrong`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
      <StyledInput type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email" />
      <StyledInput type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" /> */}
      {/* This doesn't work because there is nothing handling the input */}
      {/* <StyledInput type="text" placeholder="Email" />
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
