/*
 *
 * ProductBestSelling constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/COMMON_PRODUCT';

export const GET_PRODUCT_FOR_CATEGORY = `${CONTEXT}/GET_PRODUCT_FOR_CATEGORY`;

export const [
  GET_PRODUCT_FOR_CATEGORY_REQUEST,
  GET_PRODUCT_FOR_CATEGORY_SUCCESS,
  GET_PRODUCT_FOR_CATEGORY_FAIL,
] = createActionType(GET_PRODUCT_FOR_CATEGORY);
