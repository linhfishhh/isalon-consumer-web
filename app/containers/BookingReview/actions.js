/*
 *
 * BookingReview actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  GET_REVIEWS,
  LIKE_REVIEW,
  GET_SERVICE_TO_REVIEW,
  GET_CRIT,
  SEND_REVIEW,
  CLEAN_DATA,
  SHOW_REVIEW_FORM,
} from './constants';

export const [
  getReviewsRequest,
  getReviewsSuccess,
  getReviewsFail,
] = createSideEffectAction(GET_REVIEWS);

export const [
  likeReviewRequest,
  likeReviewSuccess,
  likeReviewFail,
] = createSideEffectAction(LIKE_REVIEW);

export const [
  getServiceToReviewRequest,
  getServiceToReviewSuccess,
  getServiceToReviewFail,
] = createSideEffectAction(GET_SERVICE_TO_REVIEW);

export const [
  getCritRequest,
  getCritSuccess,
  getCritFail,
] = createSideEffectAction(GET_CRIT);

export const [
  sendReviewRequest,
  sendReviewSuccess,
  sendReviewFail,
] = createSideEffectAction(SEND_REVIEW);

export const cleanDataAction = createSingleAction(CLEAN_DATA);

export const showReviewFormAction = createSingleAction(SHOW_REVIEW_FORM);
