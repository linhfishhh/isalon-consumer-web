import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  GET_ORDER_DETAIL,
  CLEAR_ORDER_DETAIL,
  CANCEL_ORDER,
} from './constants';

export const [
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFail,
] = createSideEffectAction(GET_ORDER_DETAIL);

export const clearOrderDetailRequest = createSingleAction(CLEAR_ORDER_DETAIL);

export const [
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFail,
] = createSideEffectAction(CANCEL_ORDER);
