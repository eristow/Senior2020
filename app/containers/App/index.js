/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import {
  Switch,
  Route,
  // BrowserRouter as RouterLink,
  Redirect,
  // useHistory,
  // useLocation,
} from 'react-router-dom';
import Header from 'components/Header';
import Auth from 'components/Auth';
import SignOut from 'components/SignOut';
import DrumMachine from 'containers/DrumMachine/Loadable';
import Piano from 'containers/Piano/Loadable';
import Drums from 'containers/Drums/Loadable';
import FileList from 'containers/FileList/components/FileList';
import Login from 'containers/Login/Loadable';
import Register from 'containers/Register/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Daw from 'containers/Daw/Loadable';

import GlobalStyle from '../../global-styles';

const AppWraper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWraper>
      <Helmet titleTemplate="%s - Web DAW" defaultTitle="Web DAW">
        <meta name="description" content="A web-based DAW" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={DrumMachine} />
        <Route exact path="/machine" component={DrumMachine} />
        <Route exact path="/piano" component={Piano} />
        <Route exact path="/drums" component={Drums} />
        <Route exact path="/fileList" component={FileList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/signout" component={SignOut} />
        <Route exact path="/register">
          {localStorage.getItem('jwtToken') === null ? (
            <Register />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/daw" component={Daw} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWraper>
  );
}
