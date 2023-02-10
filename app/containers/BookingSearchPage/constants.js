/*
 *
 * BookingSearch constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/BOOKING_SEARCH';

export const SEARCH = `${CONTEXT}/SEARCH`;
export const GET_DISTRICT = `${CONTEXT}/GET_DISTRICT`;
export const ADD_SEARCH_HISTORY = `${CONTEXT}/ADD_SEARCH_HISTORY`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const CLEAN_DATA_RESULT = `${CONTEXT}/CLEAN_DATA_RESULT`;

export const [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL] = createActionType(
  SEARCH,
);

export const [
  GET_DISTRICT_REQUEST,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
] = createActionType(GET_DISTRICT);

export const [
  ADD_SEARCH_HISTORY_REQUEST,
  ADD_SEARCH_HISTORY_SUCCESS,
  ADD_SEARCH_HISTORY_FAIL,
] = createActionType(ADD_SEARCH_HISTORY);
