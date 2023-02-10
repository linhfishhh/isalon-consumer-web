/**
 *
 * LauncherApp
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { path } from 'routers/path';
import { Redirect } from 'react-router-dom';
import {
  // setLocalStorage,
  getLocalStorage,
  storageKeys,
} from 'utils/localStorage';

// import AppIntro from 'components/AppIntro';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLauncherApp from './selectors';
import reducer from './reducer';
import saga from './saga';

export function LauncherApp(props) {
  useInjectReducer({ key: 'launcherApp', reducer });
  useInjectSaga({ key: 'launcherApp', saga });
  // const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { dispatch } = props;

  const introDisplayed = getLocalStorage(storageKeys.APP_INTRO) || true;

  // const startApp = () => {
  //   setLocalStorage(storageKeys.APP_INTRO, true);
  //   history.push(path.home);
  // };
  return (
    <>
      {introDisplayed ? (
        <Redirect to={path.bookingHome} />
      ) : (
        <></>
        // <AppIntro startApp={startApp} />
      )}
    </>
  );
}

LauncherApp.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  launcherApp: makeSelectLauncherApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LauncherApp);
