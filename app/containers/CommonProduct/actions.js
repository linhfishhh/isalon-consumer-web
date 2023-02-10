/*
 *
 * ProductBestSelling actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_PRODUCT_FOR_CATEGORY } from './constants';

export const [
  getProductForCategoryRequest,
  getProductForCategorySuccess,
  getProductForCategoryFail,
] = createSideEffectAction(GET_PRODUCT_FOR_CATEGORY);
