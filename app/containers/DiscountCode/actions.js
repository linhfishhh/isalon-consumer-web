/*
 *
 * DiscountCode actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_DISCOUNT_CODES } from './constants';

export const [
  getDiscountCodesRequest,
  getDiscountCodesSuccess,
  getDiscountCodesFail,
] = createSideEffectAction(GET_DISCOUNT_CODES);
