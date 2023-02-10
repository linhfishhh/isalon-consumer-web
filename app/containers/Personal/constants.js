/*
 *
 * Personal constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/PERSONAL_INFO';

export const GET_USER_PROFILE = `${CONTEXT}/GET_USER_PROFILE`;
export const GET_BOOKING_HISTORY = `${CONTEXT}/GET_BOOKING_HISTORY`;
export const SHOW_BOOKING_HISTORY_DETAIL = `${CONTEXT}/SHOW_BOOKING_HISTORY_DETAIL`;
export const UPDATE_PROFILE = `${CONTEXT}/UPDATE_PROFILE`;
export const UPDATE_PHONE_SUCCESS = `${CONTEXT}/UPDATE_PHONE_SUCCESS`;
export const GET_FAVORITE_PRODUCT_COUNT = `${CONTEXT}/GET_FAVORITE_PRODUCT_COUNT`;
export const CLEAR_DATA = `${CONTEXT}/CLEAR_DATA`;

export const [
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
] = createActionType(GET_USER_PROFILE);

export const [
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
] = createActionType(UPDATE_PROFILE);

export const [
  GET_BOOKING_HISTORY_REQUEST,
  GET_BOOKING_HISTORY_SUCCESS,
  GET_BOOKING_HISTORY_FAIL,
] = createActionType(GET_BOOKING_HISTORY);

export const [
  GET_FAVORITE_PRODUCT_COUNT_REQUEST,
  GET_FAVORITE_PRODUCT_COUNT_SUCCESS,
  GET_FAVORITE_PRODUCT_COUNT_FAIL,
] = createActionType(GET_FAVORITE_PRODUCT_COUNT);
