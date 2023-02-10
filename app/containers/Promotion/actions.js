/*
 *
 * Promotion actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_PROMOTION } from './constants';

export const [
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFail,
] = createSideEffectAction(GET_PROMOTION);
