/*
 *
 * Search constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/SEARCH';

export const GET_PROVINCES = `${CONTEXT}/GET_PROVINCES`;
export const GET_SEARCH_HINTS = `${CONTEXT}/GET_SEARCH_HINTS`;

export const [
  GET_PROVINCES_REQUEST,
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_FAIL,
] = createActionType(GET_PROVINCES);

export const [
  GET_SEARCH_HINTS_REQUEST,
  GET_SEARCH_HINTS_SUCCESS,
  GET_SEARCH_HINTS_FAIL,
] = createActionType(GET_SEARCH_HINTS);
