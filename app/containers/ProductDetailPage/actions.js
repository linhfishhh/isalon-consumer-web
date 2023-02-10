/*
 *
 * ProductDetailPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_VARIANT_VALUES,
  GET_PRODUCT_VARIANTS,
  ADD_PRODUCTS_TO_CART,
  GET_VIEWED_PRODUCTS,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  CLEAR_PRODUCT_DETAIL,
} from './constants';

export const [
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
] = createSideEffectAction(GET_PRODUCT_DETAIL);

export const [
  getProductVariantValuesRequest,
  getProductVariantValuesSuccess,
  getProductVariantValuesFail,
] = createSideEffectAction(GET_PRODUCT_VARIANT_VALUES);

export const [
  getProductVariantsRequest,
  getProductVariantsSuccess,
  getProductVariantsFail,
] = createSideEffectAction(GET_PRODUCT_VARIANTS);

export const [
  addProductsToCartRequest,
  addProductsToCartSuccess,
  addProductsToCartFail,
] = createSideEffectAction(ADD_PRODUCTS_TO_CART);

export const [
  getViewedProductsRequest,
  getViewedProductsSuccess,
  getViewedProductsFail,
] = createSideEffectAction(GET_VIEWED_PRODUCTS);

export const [
  likeProductRequest,
  likeProductSuccess,
  likeProductFail,
] = createSideEffectAction(LIKE_PRODUCT);

export const [
  unlikeProductRequest,
  unlikeProductSuccess,
  unlikeProductFail,
] = createSideEffectAction(UNLIKE_PRODUCT);

export const clearProductDetailRequest = createSingleAction(
  CLEAR_PRODUCT_DETAIL,
);
