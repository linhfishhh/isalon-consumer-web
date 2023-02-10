/*
 *
 * ProductFaq constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/PRODUCT_FAQ';

export const GET_FAQ = `${CONTEXT}/GET_FAQ`;
export const ADD_FAQ = `${CONTEXT}/ADD_FAQ`;

export const [
  GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
] = createActionType(GET_FAQ);

export const [
  ADD_FAQ_REQUEST,
  ADD_FAQ_SUCCESS,
  ADD_FAQ_FAIL,
] = createActionType(ADD_FAQ);
