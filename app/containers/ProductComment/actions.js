/*
 *
 * ProductComment actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_PRODUCT_REVIEWS,
  LIKE_REVIEW,
  UNLIKE_REVIEW,
  LIKE_REVIEW_REPLY,
  UNLIKE_REVIEW_REPLY,
  SEND_COMMENT,
} from './constants';

export const [
  getProductReviewsRequest,
  getProductReviewsSuccess,
  getProductReviewsFail,
] = createSideEffectAction(GET_PRODUCT_REVIEWS);

export const [
  likeReviewRequest,
  likeReviewSuccess,
  likeReviewFail,
] = createSideEffectAction(LIKE_REVIEW);

export const [
  unlikeReviewRequest,
  unlikeReviewSuccess,
  unlikeReviewFail,
] = createSideEffectAction(UNLIKE_REVIEW);

export const [
  likeReviewReplyRequest,
  likeReviewReplySuccess,
  likeReviewReplyFail,
] = createSideEffectAction(LIKE_REVIEW_REPLY);

export const [
  unlikeReviewReplyRequest,
  unlikeReviewReplySuccess,
  unlikeReviewReplyFail,
] = createSideEffectAction(UNLIKE_REVIEW_REPLY);

export const [
  sendCommentRequest,
  sendCommentSuccess,
  sendCommentFail,
] = createSideEffectAction(SEND_COMMENT);
