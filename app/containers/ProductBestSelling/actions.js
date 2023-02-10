/*
 *
 * ProductBestSelling actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_PRODUCT_LIST } from './constants';

export const [
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
] = createSideEffectAction(GET_PRODUCT_LIST);
