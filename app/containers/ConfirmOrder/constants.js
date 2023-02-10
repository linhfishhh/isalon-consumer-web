/*
 *
 * ConfirmOrder constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/CONFIRM_ORDER';
export const PRE_PAY = `${CONTEXT}/PRE_PAY`;
export const PAY = `${CONTEXT}/PAY`;
export const SELECT_ADDRESS = `${CONTEXT}/SELECT_ADDRESS`;
export const CLEAR_STATE = `${CONTEXT}/CLEAR_STATE`;

export const [
  PRE_PAY_REQUEST,
  PRE_PAY_SUCCESS,
  PRE_PAY_FAIL,
] = createActionType(PRE_PAY);

export const [PAY_REQUEST, PAY_SUCCESS, PAY_FAIL] = createActionType(PAY);
export const LOADING_ACTIONS = [PAY];
