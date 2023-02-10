/*
 *
 * BookingHistoryDetailPage constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/BOOKING_HISTORY_DETAIL';

export const GET_BOOKING_HISTORY_DETAIL = `${CONTEXT}/GET_BOOKING_HISTORY_DETAIL`;
export const CLEAR_BOOKING_HISTORY_DETAIL = `${CONTEXT}/CLEAR_BOOKING_HISTORY_DETAIL`;
export const CANCEL_BOOKING = `${CONTEXT}/CANCEL_BOOKING`;

export const [
  GET_BOOKING_HISTORY_DETAIL_REQUEST,
  GET_BOOKING_HISTORY_DETAIL_SUCCESS,
  GET_BOOKING_HISTORY_DETAIL_FAIL,
] = createActionType(GET_BOOKING_HISTORY_DETAIL);

export const [
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
] = createActionType(CANCEL_BOOKING);

export const LOADING_ACTIONS = [GET_BOOKING_HISTORY_DETAIL, CANCEL_BOOKING];
