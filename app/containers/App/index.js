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
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import Timeline from 'containers/Timeline/Loadable';
import Piano from 'containers/Piano/Loadable';
import Drums from 'containers/Drums/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/piano" component={Piano} />
        <Route exact path="/drums" component={Drums} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWraper>
  );
}
