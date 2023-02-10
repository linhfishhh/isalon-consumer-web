/*
 *
 * BookingReview reducer
 *
 */
import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_FAIL,
  GET_SERVICE_TO_REVIEW_SUCCESS,
  GET_SERVICE_TO_REVIEW_FAIL,
  GET_CRIT_SUCCESS,
  GET_CRIT_FAIL,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAIL,
  CLEAN_DATA,
  SHOW_REVIEW_FORM,
} from './constants';

export const initialState = {
  showForm: false,
  reviews: {},
  serviceToReview: [],
  crit: [],
  badges: [],
  reviewSuccess: false,
};

const updateLikeReview = (collection, payload) => {
  const { reviewId, liked, count } = payload;
  const result = collection.map(item => {
    if (item.id === reviewId) {
      const r = { ...item };
      set(r, 'liked', item.id === reviewId ? liked : item.liked);
      set(r, 'likes', item.id === reviewId ? count : item.likes);
      return r;
    }
    return item;
  });
  return result;
};

const bookingReviewReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_REVIEWS_SUCCESS: {
        const variant = get(action, 'payload.variant');
        const response = get(action, 'payload.response');
        const page = get(action, 'payload.page');
        if (page) {
          set(
            response,
            'items',
            draftClone.reviews[variant].items.concat(response.items),
          );
        }
        draftClone.reviews[variant] = response;
        break;
      }
      case GET_REVIEWS_FAIL:
      case LIKE_REVIEW_FAIL:
      case GET_SERVICE_TO_REVIEW_FAIL:
      case GET_CRIT_FAIL:
      case SEND_REVIEW_FAIL: {
        draftClone.error = get(action, 'payload');
        break;
      }
      case LIKE_REVIEW_SUCCESS: {
        const variant = get(action, 'payload.variant');
        draftClone.reviews[variant].items = updateLikeReview(
          state.reviews[variant].items,
          get(action, 'payload'),
        );
        break;
      }
      case GET_SERVICE_TO_REVIEW_SUCCESS: {
        draftClone.serviceToReview = get(action, 'payload');
        break;
      }
      case GET_CRIT_SUCCESS: {
        draftClone.crit = get(action, 'payload.crits');
        draftClone.badges = get(action, 'payload.badges');
        break;
      }
      case SEND_REVIEW_SUCCESS: {
        const orderID = get(action, 'payload.orderID');
        const serviceID = get(action, 'payload.serviceID');
        draftClone.reviewSuccess = true;
        draftClone.serviceToReview = state.serviceToReview.filter(
          item => !(item.orderID === orderID && item.serviceID === serviceID),
        );
        break;
      }
      case CLEAN_DATA: {
        const cloneDraft = draft;
        const payload = get(action, 'payload');
        forEach(isEmpty(payload) ? keysIn(cloneDraft) : payload, key => {
          set(cloneDraft, key, initialState[key]);
        });
        break;
      }
      case SHOW_REVIEW_FORM: {
        draftClone.showForm = get(action, 'payload');
        break;
      }
      default:
        break;
    }
  });

export default bookingReviewReducer;
