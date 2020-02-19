/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Form from './Form';
import StyledInput from './StyledInput';

const handleClick = () => {};

function LoginForm() {
  return (
    <Form>
      <h2>Login</h2>
      <StyledInput type="text" placeholder="email" />
      <StyledInput type="password" placeholder="password" />
      <button onClick={handleClick}>Login</button>
    </Form>
  );
}

LoginForm.propTypes = {};

export default memo(LoginForm);
