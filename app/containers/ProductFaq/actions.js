/*
 *
 * ProductFaq actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_FAQ, ADD_FAQ } from './constants';

export const [
  getFaqRequest,
  getFaqSuccess,
  getFaqFail,
] = createSideEffectAction(GET_FAQ);

export const [
  addFaqRequest,
  addFaqSuccess,
  addFaqFail,
] = createSideEffectAction(ADD_FAQ);
