/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
import Signup from 'containers/Signup/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Account from 'containers/Account/Loadable';
import Subscription from 'containers/Subscription/Loadable';
import Cancel from 'containers/Cancel/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Prometheos Si" defaultTitle="Prometheos Si">
        <meta name="description" content="A Prometheos Si application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/cancel" component={Cancel} />
        <Route exact path="/subscription" component={Subscription} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </AppWrapper>
  );
}
