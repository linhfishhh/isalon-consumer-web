/*
 *
 * ShoppingHistoryPage constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/SHOPPING_HISTORY';

export const GET_SHOPPING_HISTORY = `${CONTEXT}/GET_SHOPPING_HISTORY`;
export const CANCEL_ORDER_SUCCESS = `${CONTEXT}/CANCEL_ORDER_SUCCESS`;

export const [
  GET_SHOPPING_HISTORY_REQUEST,
  GET_SHOPPING_HISTORY_SUCCESS,
  GET_SHOPPING_HISTORY_FAIL,
] = createActionType(GET_SHOPPING_HISTORY);
