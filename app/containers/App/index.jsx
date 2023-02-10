/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';

import history from 'utils/history';
import pushNotification from 'utils/pushNotification';

import { WebRouters } from 'routers';

import GlobalState from 'containers/GlobalState';
import Authentication from 'containers/Authentication';
import InviteFriends from 'containers/InviteFriends';
import MessengerChat from 'components/MessengerChat';
import AffiliatePage from 'containers/AffiliatePage';
import Popup from 'containers/Popup';

import GlobalStyle from 'assets/styles/global-styles';
import themes from 'assets/themes';
import 'assets/css/styles.css';

export default function App() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      pushNotification.initialize();
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={themes[0]}>
        <GlobalStyle />
        <GlobalState />
        <ThemeProvider theme={themes[0]}>
          <>
            <WebRouters />
            <Authentication />
            <MessengerChat />
            <InviteFriends />
            <AffiliatePage />
            <Popup />
          </>
        </ThemeProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  );
}
