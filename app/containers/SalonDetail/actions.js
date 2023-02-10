/*
 *
 * SalonDetail actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  GET,
  CLEAN_DATA,
  FAVORITE,
  FAVORITE_COLLECTION,
  BOOKING_SUCCESS,
} from './constants';

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);

export const [
  favoriteRequest,
  favoriteSuccess,
  favoriteFail,
] = createSideEffectAction(FAVORITE);

export const [
  favoriteCollectionRequest,
  favoriteCollectionSuccess,
  favoriteCollectionFail,
] = createSideEffectAction(FAVORITE_COLLECTION);

export const bookingSuccessAction = createSingleAction(BOOKING_SUCCESS);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
