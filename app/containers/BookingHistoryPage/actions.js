/*
 *
 * BookingHistoryPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_BOOKING_HISTORY,
  SHOW_BOOKING_HISTORY_DETAIL,
  HIDE_BOOKING_HISTORY_DETAIL,
  CANCEL_BOOKING_ORDER,
} from './constants';

export const [
  getBookingHistoryRequest,
  getBookingHistorySuccess,
  getBookingHistoryFail,
] = createSideEffectAction(GET_BOOKING_HISTORY);

export const showBookingHistoryAction = createSingleAction(
  SHOW_BOOKING_HISTORY_DETAIL,
);
export const hideBookingHistoryAction = createSingleAction(
  HIDE_BOOKING_HISTORY_DETAIL,
);

export const [
  cancelBookingOrderRequest,
  cancelBookingOrderSuccess,
  cancelBookingOrderFail,
] = createSideEffectAction(CANCEL_BOOKING_ORDER);
