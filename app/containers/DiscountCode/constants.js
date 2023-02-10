/*
 *
 * DiscountCode constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/DISCOUNT_CODE';

export const GET_DISCOUNT_CODES = `${CONTEXT}/GET_DISCOUNT_CODES`;

export const [
  GET_DISCOUNT_CODES_REQUEST,
  GET_DISCOUNT_CODES_SUCCESS,
  GET_DISCOUNT_CODES_FAIL,
] = createActionType(GET_DISCOUNT_CODES);
