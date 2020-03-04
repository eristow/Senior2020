/**
 *
 * Header
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

function Header() {
  return (
    <NavBar>
      <HeaderLink to="/">
        <FormattedMessage {...messages.home} />
      </HeaderLink>
      <HeaderLink to="/machine">
        <FormattedMessage {...messages.drumMachine} />
      </HeaderLink>
      <HeaderLink to="/daw">DAW</HeaderLink>
    </NavBar>
  );
}

export default Header;
