/**
 *
 * SignOut
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SignOut() {
  const clearLocalStorage = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    window.location.reload();
    window.location.href = '/';
  };

  return <div>{clearLocalStorage()}</div>;
}

SignOut.propTypes = {};

export default SignOut;
