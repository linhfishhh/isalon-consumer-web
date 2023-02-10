/*
 *
 * ProductBestSelling constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/PRODUCT_BEST_SELLING';

export const GET_PRODUCT_LIST = `${CONTEXT}/GET_PRODUCT_LIST`;

export const [
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
] = createActionType(GET_PRODUCT_LIST);
