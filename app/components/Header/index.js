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
      {/* <HeaderLink to="/">
        <FormattedMessage {...messages.home} />
      </HeaderLink> */}
      <HeaderLink to="/machine">
        <FormattedMessage {...messages.drumMachine} />
      </HeaderLink>
      {/* <HeaderLink to="/daw">DAW</HeaderLink> */}
      {localStorage.getItem('jwtToken') ? (
        <>
          <HeaderLink to="/fileList">
            <FormattedMessage {...messages.fileList} />
          </HeaderLink>
          <HeaderLink to="/signout" color="red">
            Sign Out
          </HeaderLink>
        </>
      ) : (
        <HeaderLink to="/auth">
          <FormattedMessage {...messages.login} />
        </HeaderLink>
      )}
    </NavBar>
  );
}

export default Header;
