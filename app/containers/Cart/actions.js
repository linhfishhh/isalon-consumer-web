/*
 *
 * Cart actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_CART,
  ADD_PRODUCT_ITEM,
  REMOVE_PRODUCT_ITEM,
  REMOVE_CART_ITEM,
  SELECT_CART_ITEM,
  SELECT_ALL_CART_ITEMS,
  SELECT_ADDRESS,
  GET_CART_QUANTITY,
  SHOW_ERROR,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  CLEAR_CART_VIEW,
  CALCULATE_CART,
} from './constants';

export const [
  getCartRequest,
  getCartSuccess,
  getCartFail,
] = createSideEffectAction(GET_CART);

export const [
  addProductItem,
  addProductItemSuccess,
  addProductItemFail,
] = createSideEffectAction(ADD_PRODUCT_ITEM);

export const [
  removeProductItem,
  removeProductItemSuccess,
  removeProductItemFail,
] = createSideEffectAction(REMOVE_PRODUCT_ITEM);

export const [
  removeCartItem,
  removeCartItemSuccess,
  removeCartItemFail,
] = createSideEffectAction(REMOVE_CART_ITEM);

export const [
  selectCartItem,
  selectCartItemSuccess,
  selectCartItemFail,
] = createSideEffectAction(SELECT_CART_ITEM);

export const [
  selectAllCartItems,
  selectAllCartItemsSuccess,
  selectAllCartItemsFail,
] = createSideEffectAction(SELECT_ALL_CART_ITEMS);

export const selectAddress = createSingleAction(SELECT_ADDRESS);

export const [
  getCartQuantityRequest,
  getCartQuantitySuccess,
  getCartQuantityFail,
] = createSideEffectAction(GET_CART_QUANTITY);

export const showError = createSingleAction(SHOW_ERROR);

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

export const clearCartViewRequest = createSingleAction(CLEAR_CART_VIEW);

export const [
  calculateCart,
  calculateCartSuccess,
  calculateCartFail,
] = createSideEffectAction(CALCULATE_CART);
