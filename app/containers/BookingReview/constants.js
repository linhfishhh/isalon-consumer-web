/*
 *
 * BookingReview constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'BOOKING_REVIEW';

export const GET_REVIEWS = `${CONTEXT}/GET_REVIEWS`;
export const LIKE_REVIEW = `${CONTEXT}/LIKE_REVIEW`;
export const GET_SERVICE_TO_REVIEW = `${CONTEXT}/GET_SERVICE_TO_REVIEW`;
export const GET_CRIT = `${CONTEXT}/GET_CRIT`;
export const SEND_REVIEW = `${CONTEXT}/SEND_REVIEW`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const SHOW_REVIEW_FORM = `${CONTEXT}/SHOW_REVIEW_FORM`;

export const [
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
] = createActionType(GET_REVIEWS);

export const [
  LIKE_REVIEW_REQUEST,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_FAIL,
] = createActionType(LIKE_REVIEW);

export const [
  GET_SERVICE_TO_REVIEW_REQUEST,
  GET_SERVICE_TO_REVIEW_SUCCESS,
  GET_SERVICE_TO_REVIEW_FAIL,
] = createActionType(GET_SERVICE_TO_REVIEW);

export const [
  GET_CRIT_REQUEST,
  GET_CRIT_SUCCESS,
  GET_CRIT_FAIL,
] = createActionType(GET_CRIT);

export const [
  SEND_REVIEW_REQUEST,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAIL,
] = createActionType(SEND_REVIEW);
