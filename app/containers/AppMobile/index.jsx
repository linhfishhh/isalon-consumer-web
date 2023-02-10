/**
 *
 * AppMobile
 *
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import history from 'utils/history';
import { ConnectedRouter } from 'connected-react-router';

import MainTabs from 'containers/MainTabs/Loadable';
import Authentication from 'containers/Authentication';
import InviteFriends from 'containers/InviteFriends';
import AffiliatePage from 'containers/AffiliatePage';
import GlobalState from 'containers/GlobalState';
import Popup from 'containers/Popup';

import { AppRouters } from 'routers';
import { path } from 'routers/path';
import themes from 'assets/themes';
import GlobalStyle from 'assets/styles/global-styles';
import 'assets/css/styles.css';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const AppMobile = () => (
  <ConnectedRouter history={history}>
    <MuiThemeProvider theme={themes[0]}>
      <GlobalStyle />
      <GlobalState />
      <ThemeProvider theme={themes[0]}>
        <>
          <Switch>
            {AppRouters}
            <Route path={path.home} component={MainTabs} />
          </Switch>
          <Authentication />
          <InviteFriends />
          <AffiliatePage />
          <Popup />
        </>
      </ThemeProvider>
    </MuiThemeProvider>
  </ConnectedRouter>
);

export default AppMobile;
