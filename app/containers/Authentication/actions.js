/*
 *
 * Sign in actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  SHOW_DIALOG,
  FB_VERIFY_PHONE,
  LOGIN,
  LOGIN_SOCIAL,
  CREATE_ACCOUNT,
  VERIFY_PHONE,
  VERIFY_TOKEN,
  LOGOUT,
  CLEAN_DATA,
  LOGIN_COMPLETED,
  UPDATE_USER_INFO,
} from './constants';

export const showDialogAction = createSingleAction(SHOW_DIALOG);

export const [loginRequest, loginSuccess, loginFail] = createSideEffectAction(
  LOGIN,
);

export const [
  fbVerifyPhoneRequest,
  fbVerifyPhoneSuccess,
  fbVerifyPhoneFail,
] = createSideEffectAction(FB_VERIFY_PHONE);

export const [
  loginSocialRequest,
  loginSocialSuccess,
  loginSocialFail,
] = createSideEffectAction(LOGIN_SOCIAL);

export const [
  createAccountRequest,
  createAccountSuccess,
  createAccountFail,
] = createSideEffectAction(CREATE_ACCOUNT);

export const [
  verifyPhoneRequest,
  verifyPhoneSuccess,
  verifyPhoneFail,
] = createSideEffectAction(VERIFY_PHONE);

export const [
  logoutRequest,
  logoutSuccess,
  logoutFail,
] = createSideEffectAction(LOGOUT);

export const [
  verifyTokenRequest,
  verifyTokenSuccess,
  verifyTokenFail,
] = createSideEffectAction(VERIFY_TOKEN);

export const loginCompletedAction = createSingleAction(LOGIN_COMPLETED);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const updateUserInfoAction = createSingleAction(UPDATE_USER_INFO);
