/*
 *
 * History actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_BOOKING_WAITING,
  GET_SHOPPING_WAITING,
  CLEAN_DATA,
  CHANGE_TYPE_ACTIVE,
} from './constants';

export const [
  getBookingWaitingRequest,
  getBookingWaitingSuccess,
  getBookingWaitingFail,
] = createSideEffectAction(GET_BOOKING_WAITING);

export const [
  getShoppingWaitingRequest,
  getShoppingWaitingSuccess,
  getShoppingWaitingFail,
] = createSideEffectAction(GET_SHOPPING_WAITING);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const changeTypeActiveAction = createSingleAction(CHANGE_TYPE_ACTIVE);
