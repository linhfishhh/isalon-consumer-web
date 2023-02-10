/*
 *
 * ShoppingHistoryPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import { GET_SHOPPING_HISTORY, CANCEL_ORDER_SUCCESS } from './constants';

export const [
  getShoppingHistoryRequest,
  getShoppingHistorySuccess,
  getShoppingHistoryFail,
] = createSideEffectAction(GET_SHOPPING_HISTORY);

export const cancelOrderSuccessAction = createSingleAction(
  CANCEL_ORDER_SUCCESS,
);
