/*
 *
 * DiscountCode actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import { GET_VERIFICATION_CODE, VERIFY_CODE, CLEAR_DATA } from './constants';

export const [
  getVerificationCodeRequest,
  getVerificationCodeSuccess,
  getVerificationCodeFail,
] = createSideEffectAction(GET_VERIFICATION_CODE);

export const [
  verifyCodeRequest,
  verifyCodeSuccess,
  verifyCodeFail,
] = createSideEffectAction(VERIFY_CODE);

export const clearDataRequest = createSingleAction(CLEAR_DATA);
