/**
 *
 * Auth
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import JWT from 'jsonwebtoken';

function Auth() {
  const redirect = route => {
    window.location.reload();
    window.location.replace(route);
  };

  const checkJWT = () => {
    if (localStorage.getItem('jwtToken')) {
      JWT.verify(
        localStorage.getItem('jwtToken'),
        process.env.JWT_SECRET,
        err => {
          if (err) {
            redirect('/login');
          } else {
            redirect('/fileList');
          }
        },
      );
    } else {
      redirect('/login');
    }
  };

  return <div>{checkJWT()}</div>;
}

Auth.propTypes = {};

export default Auth;
