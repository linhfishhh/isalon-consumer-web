/*
 *
 * ProductHomePage constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/PRODUCT_HOME';

export const GET_ALL_PRODUCT = `${CONTEXT}/GET_ALL_PRODUCT`;
export const GET_SUGGESTED_PRODUCT = `${CONTEXT}/GET_SUGGESTED_PRODUCT`;
export const GET_SPOTLIGHTS = `${CONTEXT}/GET_SPOTLIGHTS`;
export const GET_NEW_PRODUCTS = `${CONTEXT}/GET_NEW_PRODUCTS`;
export const GET_FLASH_SALE = `${CONTEXT}/GET_FLASH_SALE`;
export const GET_FEATURED_BRANDS = `${CONTEXT}/GET_FEATURED_BRANDS`;

export const [
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAIL,
] = createActionType(GET_ALL_PRODUCT);

export const [
  GET_SUGGESTED_PRODUCT_REQUEST,
  GET_SUGGESTED_PRODUCT_SUCCESS,
  GET_SUGGESTED_PRODUCT_FAIL,
] = createActionType(GET_SUGGESTED_PRODUCT);

export const [
  GET_SPOTLIGHTS_REQUEST,
  GET_SPOTLIGHTS_SUCCESS,
  GET_SPOTLIGHTS_FAIL,
] = createActionType(GET_SPOTLIGHTS);

export const [
  GET_NEW_PRODUCTS_REQUEST,
  GET_NEW_PRODUCTS_SUCCESS,
  GET_NEW_PRODUCTS_FAIL,
] = createActionType(GET_NEW_PRODUCTS);

export const [
  GET_FLASH_SALE_REQUEST,
  GET_FLASH_SALE_SUCCESS,
  GET_FLASH_SALE_FAIL,
] = createActionType(GET_FLASH_SALE);

export const [
  GET_FEATURED_BRANDS_REQUEST,
  GET_FEATURED_BRANDS_SUCCESS,
  GET_FEATURED_BRANDS_FAIL,
] = createActionType(GET_FEATURED_BRANDS);