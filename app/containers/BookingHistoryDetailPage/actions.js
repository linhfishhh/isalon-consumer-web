/*
 *
 * BookingHistoryDetailPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_BOOKING_HISTORY_DETAIL,
  CLEAR_BOOKING_HISTORY_DETAIL,
  CANCEL_BOOKING,
} from './constants';

export const [
  getBookingHistoryDetailRequest,
  getBookingHistoryDetailSuccess,
  getBookingHistoryDetailFail,
] = createSideEffectAction(GET_BOOKING_HISTORY_DETAIL);

export const clearBookingHistoryDetailAction = createSingleAction(
  CLEAR_BOOKING_HISTORY_DETAIL,
);

export const [
  cancelBookingRequest,
  cancelBookingSuccess,
  cancelBookingFail,
] = createSideEffectAction(CANCEL_BOOKING);
