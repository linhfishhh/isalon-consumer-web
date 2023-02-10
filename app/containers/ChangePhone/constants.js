/*
 *
 * DiscountCode constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/CHANGE_PHONE';

export const GET_VERIFICATION_CODE = `${CONTEXT}/GET_VERIFICATION_CODE`;
export const VERIFY_CODE = `${CONTEXT}/VERIFY_CODE`;
export const CLEAR_DATA = `${CONTEXT}/CLEAR_DATA`;

export const [
  GET_VERIFICATION_CODE_REQUEST,
  GET_VERIFICATION_CODE_SUCCESS,
  GET_VERIFICATION_CODE_FAIL,
] = createActionType(GET_VERIFICATION_CODE);

export const [
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
] = createActionType(VERIFY_CODE);
