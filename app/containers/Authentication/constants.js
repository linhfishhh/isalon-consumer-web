/*
 *
 * SignIn constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/AUTH';

export const SHOW_DIALOG = `${CONTEXT}/SHOW_DIALOG`;

export const FB_VERIFY_PHONE = `${CONTEXT}/FB_VERIFY_PHONE`;
export const LOGIN = `${CONTEXT}/LOGIN`;
export const LOGIN_SOCIAL = `${CONTEXT}/LOGIN_SOCIAL`;
export const CREATE_ACCOUNT = `${CONTEXT}/CREATE_ACCOUNT`;
export const VERIFY_PHONE = `${CONTEXT}/VERIFY_PHONE`;
export const VERIFY_TOKEN = `${CONTEXT}/VERIFY_TOKEN`;
export const LOGOUT = `${CONTEXT}/LOGOUT`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const LOGIN_COMPLETED = `${CONTEXT}/LOGIN_COMPLETED`;
export const UPDATE_USER_INFO = `${CONTEXT}/UPDATE_USER_INFO`;

export const [
  FB_VERIFY_PHONE_REQUEST,
  FB_VERIFY_PHONE_SUCCESS,
  FB_VERIFY_PHONE_FAIL,
] = createActionType(FB_VERIFY_PHONE);

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL] = createActionType(
  LOGIN,
);

export const [
  LOGIN_SOCIAL_REQUEST,
  LOGIN_SOCIAL_SUCCESS,
  LOGIN_SOCIAL_FAIL,
] = createActionType(LOGIN_SOCIAL);

export const [
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
] = createActionType(CREATE_ACCOUNT);

export const [
  VERIFY_PHONE_REQUEST,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_FAIL,
] = createActionType(VERIFY_PHONE);

export const [
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAIL,
] = createActionType(VERIFY_TOKEN);

export const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL] = createActionType(
  LOGOUT,
);
