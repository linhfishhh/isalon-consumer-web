/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { isMobileOnly } from 'utils/platform';
import history from 'utils/history';
import { createUUID } from 'utils/auth';
import cordovaSupport from 'utils/configs/cordovaSupport';

// import 'utils/configs/offlinePlugin';
import 'utils/configs/configureFirebase';
import 'utils/configs/updateMetadata';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App/Loadable';
import AppMobile from 'containers/AppMobile/Loadable';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
import '!file-loader?name=[name].[ext]!./assets/images/ic_logo.png';
import 'file-loader?name=.htaccess!./.htaccess';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create UUID
createUUID();

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        {isMobileOnly ? <AppMobile /> : <App />}
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
  cordovaSupport();
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/vi.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}
