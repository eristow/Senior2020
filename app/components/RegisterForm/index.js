/**
 *
 * RegisterForm
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://localhost:8080/api/auth/register';

  const handleSubmit = evt => {
    evt.preventDefault();
    // alert(`Submitting Name ${email}`);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email)) {
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
      });
    }
    else {
      alert(`Please enter a proper email address`);
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
      <label>
        Password:
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
      </label>
      <input type="submit" value="Register" />
    </form>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
