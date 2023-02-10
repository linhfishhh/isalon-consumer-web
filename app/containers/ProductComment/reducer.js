/*
 *
 * ProductComment reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import {
  GET_PRODUCT_REVIEWS_SUCCESS,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_REPLY_SUCCESS,
  UNLIKE_REVIEW_SUCCESS,
  UNLIKE_REVIEW_REPLY_SUCCESS,
} from './constants';

export const initialState = {
  reviews: {},
};

function updateLikeStatusReview(draft, likeStatus) {
  const cloneDraft = draft;
  if (cloneDraft.reviews) {
    const content = get(cloneDraft, 'reviews.content', []);
    const result = content.map(element => {
      if (element.productReviewId === likeStatus.productReviewId) {
        if (likeStatus.isLiked) {
          set(element, 'numLikes', element.numLikes + 1);
        } else {
          set(element, 'numLikes', element.numLikes - 1);
        }
        set(element, 'isLiked', likeStatus.isLiked);
      }
      return element;
    });
    const reviews = { ...cloneDraft.reviews };
    set(reviews, 'content', result);
    cloneDraft.reviews = reviews;
  }
}

function updateLikeStatusReply(draft, likeStatus) {
  const cloneDraft = draft;
  if (cloneDraft.reviews) {
    const content = get(cloneDraft, 'reviews.content', []);
    const result = content.map(element => {
      const reply = element.productReviewMessage;
      if (
        reply &&
        reply.productReviewMessageId === likeStatus.productReviewMessageId
      ) {
        if (likeStatus.isLiked) {
          set(element.productReviewMessage, 'numLikes', reply.numLikes + 1);
        } else {
          set(element.productReviewMessage, 'numLikes', reply.numLikes - 1);
        }
        set(element.productReviewMessage, 'isLiked', likeStatus.isLiked);
      }
      return element;
    });
    const reviews = { ...cloneDraft.reviews };
    set(reviews, 'content', result);
    cloneDraft.reviews = reviews;
  }
}

/* eslint-disable default-case, no-param-reassign */
const productCommentReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRODUCT_REVIEWS_SUCCESS: {
        const payload = get(action, 'payload.data', {});
        cloneDraft.reviews = payload;
        break;
      }
      case LIKE_REVIEW_SUCCESS: {
        const likeStatus = get(action, 'payload.data');
        updateLikeStatusReview(draft, likeStatus);
        break;
      }
      case UNLIKE_REVIEW_SUCCESS: {
        const likeStatus = get(action, 'payload.data');
        updateLikeStatusReview(draft, likeStatus);
        break;
      }
      case LIKE_REVIEW_REPLY_SUCCESS: {
        const likeStatus = get(action, 'payload.data');
        updateLikeStatusReply(draft, likeStatus);
        break;
      }
      case UNLIKE_REVIEW_REPLY_SUCCESS: {
        const likeStatus = get(action, 'payload.data');
        updateLikeStatusReply(draft, likeStatus);
        break;
      }
    }
  });

export default productCommentReducer;
