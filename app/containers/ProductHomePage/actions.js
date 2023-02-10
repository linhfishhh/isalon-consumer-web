/*
 *
 * ProductHomePage actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_ALL_PRODUCT,
  GET_SUGGESTED_PRODUCT,
  GET_SPOTLIGHTS,
  GET_NEW_PRODUCTS,
  GET_FLASH_SALE,
  GET_FEATURED_BRANDS,
} from './constants';

export const [
  getAllProductRequest,
  getAllProductSuccess,
  getAllProductFail,
] = createSideEffectAction(GET_ALL_PRODUCT);

export const [
  getSuggestedProductRequest,
  getSuggestedProductSuccess,
  getSuggestedProductFail,
] = createSideEffectAction(GET_SUGGESTED_PRODUCT);

export const [
  getSpotlightsRequest,
  getSpotlightsSuccess,
  getSpotlightsFail,
] = createSideEffectAction(GET_SPOTLIGHTS);

export const [
  getNewProductsRequest,
  getNewProductsSuccess,
  getNewProductsFail,
] = createSideEffectAction(GET_NEW_PRODUCTS);

export const [
  getFlashSaleRequest,
  getFlashSaleSuccess,
  getFlashSaleFail,
] = createSideEffectAction(GET_FLASH_SALE);

export const [
  getFeaturedBrandsRequest,
  getFeaturedBrandsSuccess,
  getFeaturedBrandsFail,
] = createSideEffectAction(GET_FEATURED_BRANDS);
