/*
 *
 * BookingPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  GET_BOOKING_ITEMS,
  GET_SALON_INFO,
  GET_SALON_OPEN_TIME,
  CHANGE_QUANTITY,
  REMOVE_SERVICE,
  ADD_BOOKING,
  PRE_PAY_BOOKING_COIN,
} from './constants';

export const [
  getBookingItemsRequest,
  getBookingItemsSuccess,
  getBookingItemsFail,
] = createSideEffectAction(GET_BOOKING_ITEMS);

export const [
  getSalonInfoRequest,
  getSalonInfoSuccess,
  getSalonInfoFail,
] = createSideEffectAction(GET_SALON_INFO);

export const [
  getSalonOpenTimeRequest,
  getSalonOpenTimeSuccess,
  getSalonOpenTimeFail,
] = createSideEffectAction(GET_SALON_OPEN_TIME);

export const [
  prePayBookingCoinRequest,
  prePayBookingCoinSuccess,
  prePayBookingCoinFail,
] = createSideEffectAction(PRE_PAY_BOOKING_COIN);

export const [
  addBookingRequest,
  addBookingSuccess,
  addBookingFail,
] = createSideEffectAction(ADD_BOOKING);

export const changeQuantityAction = createSingleAction(CHANGE_QUANTITY);
export const removeServiceAction = createSingleAction(REMOVE_SERVICE);
