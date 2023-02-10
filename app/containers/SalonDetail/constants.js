/*
 *
 * SalonDetail constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/SALON_DETAIL';

export const GET = `${CONTEXT}/GET`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const FAVORITE = `${CONTEXT}/FAVORITE`;
export const FAVORITE_COLLECTION = `${CONTEXT}/FAVORITE_COLLECTION`;
export const BOOKING_SUCCESS = `${CONTEXT}/BOOKING_SUCCESS`;

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);

export const [
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAIL,
] = createActionType(FAVORITE);

export const [
  FAVORITE_COLLECTION_REQUEST,
  FAVORITE_COLLECTION_SUCCESS,
  FAVORITE_COLLECTION_FAIL,
] = createActionType(FAVORITE_COLLECTION);
