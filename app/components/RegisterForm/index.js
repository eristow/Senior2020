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
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://localhost:8080/api/auth/register';

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
      <input type="submit" value="Register" />
    </form>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
