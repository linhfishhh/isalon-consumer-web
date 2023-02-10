/*
 *
 * Promotion constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'PROMOTION';

export const GET_PROMOTION = `${CONTEXT}/GET_PROMOTION`;
export const [
  GET_PROMOTION_REQUEST,
  GET_PROMOTION_SUCCESS,
  GET_PROMOTION_FAIL,
] = createActionType(GET_PROMOTION);
