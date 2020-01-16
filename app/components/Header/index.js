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
      <HeaderLink to="/timeline">
        <FormattedMessage {...messages.timeline} />
      </HeaderLink>
      <HeaderLink to="/piano">
        <FormattedMessage {...messages.piano} />
      </HeaderLink>
      <HeaderLink to="/drums">
        <FormattedMessage {...messages.drums} />
      </HeaderLink>
    </NavBar>
  );
}

export default Header;
