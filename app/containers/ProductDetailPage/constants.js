/*
 *
 * ProductDetailPage constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/PRODUCT_DETAIL';

export const GET_PRODUCT_DETAIL = `${CONTEXT}/GET_PRODUCT_DETAIL`;
export const GET_PRODUCT_VARIANT_VALUES = `${CONTEXT}/GET_PRODUCT_VARIANT_VALUES`;
export const GET_PRODUCT_VARIANTS = `${CONTEXT}/GET_PRODUCT_VARIANTS`;
export const ADD_PRODUCTS_TO_CART = `${CONTEXT}/ADD_PRODUCTS_TO_CART`;
export const GET_VIEWED_PRODUCTS = `${CONTEXT}/GET_VIEWED_PRODUCTS`;
export const LIKE_PRODUCT = `${CONTEXT}/LIKE_PRODUCT`;
export const UNLIKE_PRODUCT = `${CONTEXT}/UNLIKE_PRODUCT`;
export const CLEAR_PRODUCT_DETAIL = `${CONTEXT}/CLEAR_PRODUCT_DETAIL`;

export const [
  GET_PRODUCT_DETAIL_REQUEST,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
] = createActionType(GET_PRODUCT_DETAIL);

export const [
  GET_PRODUCT_VARIANT_VALUES_REQUEST,
  GET_PRODUCT_VARIANT_VALUES_SUCCESS,
  GET_PRODUCT_VARIANT_VALUES_FAIL,
] = createActionType(GET_PRODUCT_VARIANT_VALUES);

export const [
  GET_PRODUCT_VARIANTS_REQUEST,
  GET_PRODUCT_VARIANTS_SUCCESS,
  GET_PRODUCT_VARIANTS_FAIL,
] = createActionType(GET_PRODUCT_VARIANTS);

export const [
  ADD_PRODUCTS_TO_CART_REQUEST,
  ADD_PRODUCTS_TO_CART_SUCCESS,
  ADD_PRODUCTS_TO_CART_FAIL,
] = createActionType(ADD_PRODUCTS_TO_CART);

export const [
  GET_VIEWED_PRODUCTS_REQUEST,
  GET_VIEWED_PRODUCTS_SUCCESS,
  GET_VIEWED_PRODUCTS_FAIL,
] = createActionType(GET_VIEWED_PRODUCTS);

export const [
  LIKE_PRODUCT_REQUEST,
  LIKE_PRODUCT_SUCCESS,
  LIKE_PRODUCT_FAIL,
] = createActionType(LIKE_PRODUCT);

export const [
  UNLIKE_PRODUCT_REQUEST,
  UNLIKE_PRODUCT_SUCCESS,
  UNLIKE_PRODUCT_FAIL,
] = createActionType(UNLIKE_PRODUCT);
