/*
 *
 * Personal actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_USER_PROFILE,
  GET_BOOKING_HISTORY,
  SHOW_BOOKING_HISTORY_DETAIL,
  UPDATE_PROFILE,
  UPDATE_PHONE_SUCCESS,
  GET_FAVORITE_PRODUCT_COUNT,
  CLEAR_DATA,
} from './constants';

export const [
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFail,
] = createSideEffectAction(GET_USER_PROFILE);

export const [
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
] = createSideEffectAction(UPDATE_PROFILE);

export const [
  getBookingHistoryRequest,
  getBookingHistorySuccess,
  getBookingHistoryFail,
] = createSideEffectAction(GET_BOOKING_HISTORY);

export const [
  getFavoriteProductCountRequest,
  getFavoriteProductCountSuccess,
  getFavoriteProductCountFail,
] = createSideEffectAction(GET_FAVORITE_PRODUCT_COUNT);

export const showBookingHistoryAction = createSingleAction(
  SHOW_BOOKING_HISTORY_DETAIL,
);

export const updatePhoneSuccess = createSingleAction(UPDATE_PHONE_SUCCESS);
export const clearDataAction = createSingleAction(CLEAR_DATA);
