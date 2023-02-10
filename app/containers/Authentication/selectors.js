import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
/**
 * Direct selector to the sign in state domain
 */

const selectSignInDomain = state => state[CONTEXT] || initialState;

const makeSelectShowDialog = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.showDialog,
  );

const makeSelectLoginSuccess = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.loginSuccess,
  );

const makeSelectIsError = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.isError,
  );

const makeSelectMessage = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.message,
  );

const makeSelectAuthenticated = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.authenticated,
  );

const makeSelectLogoutSuccess = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.logoutSuccess,
  );

const makeSelectVerifyPhoneMessage = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.verifyPhoneMessage,
  );

const makeSelectLoginCompleted = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.loginCompleted,
  );

const makeSelectUserInfoLogged = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.userInfoLogged,
  );

const makeSelectForceRetry = () =>
  createSelector(
    selectSignInDomain,
    subState => subState.forceRetry,
  );

export {
  makeSelectShowDialog,
  makeSelectLoginSuccess,
  makeSelectIsError,
  makeSelectMessage,
  makeSelectAuthenticated,
  makeSelectLogoutSuccess,
  makeSelectVerifyPhoneMessage,
  makeSelectLoginCompleted,
  makeSelectUserInfoLogged,
  makeSelectForceRetry,
};
