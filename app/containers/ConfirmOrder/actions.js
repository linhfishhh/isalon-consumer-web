/*
 *
 * ConfirmOrder actions
 *
 */
import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import { PRE_PAY, PAY, SELECT_ADDRESS, CLEAR_STATE } from './constants';

export const [
  prePayRequest,
  prePaySuccess,
  prePayFail,
] = createSideEffectAction(PRE_PAY);

export const [payRequest, paySuccess, payFail] = createSideEffectAction(PAY);

export const selectAddress = createSingleAction(SELECT_ADDRESS);
export const clearState = createSingleAction(CLEAR_STATE);
