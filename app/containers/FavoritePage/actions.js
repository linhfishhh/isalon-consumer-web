/*
 *
 * FavoritePage actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_FAVORITED_SALONS,
  REMOVE_FAVORITED_SALON,
  REMOVE_FAVORITED_SHOWCASE,
  GET_FAVORITED_PRODUCTS,
  REMOVE_FAVORITED_PRODUCT,
} from './constants';

export const [
  getFavoritedSalonsRequest,
  getFavoritedSalonsSuccess,
  getFavoritedSalonsFail,
] = createSideEffectAction(GET_FAVORITED_SALONS);

export const [
  removeFavoritedSalonRequest,
  removeFavoritedSalonSuccess,
  removeFavoritedSalonFail,
] = createSideEffectAction(REMOVE_FAVORITED_SALON);

export const [
  removeFavoritedShowcaseRequest,
  removeFavoritedShowcaseSuccess,
  removeFavoritedShowcaseFail,
] = createSideEffectAction(REMOVE_FAVORITED_SHOWCASE);

export const [
  getFavoritedProductsRequest,
  getFavoritedProductsSuccess,
  getFavoritedProductsFail,
] = createSideEffectAction(GET_FAVORITED_PRODUCTS);

export const [
  removeFavoritedProductRequest,
  removeFavoritedProductSuccess,
  removeFavoritedProductFail,
] = createSideEffectAction(REMOVE_FAVORITED_PRODUCT);
