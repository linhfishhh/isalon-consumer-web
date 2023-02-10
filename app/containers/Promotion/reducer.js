/*
 *
 * Promotion reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_PROMOTION_REQUEST,
  GET_PROMOTION_SUCCESS,
  GET_PROMOTION_FAIL,
} from './constants';

export const initialState = {
  promotion: {},
  banners: [],
  loading: false,
  error: {},
};

const promotionReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PROMOTION_REQUEST:
        cloneDraft.loading = true;
        break;
      case GET_PROMOTION_SUCCESS:
        cloneDraft.promotion = get(action.payload, 'promo_salons', {});
        cloneDraft.banners = get(action.payload, 'banners', []);
        cloneDraft.loading = false;
        break;
      case GET_PROMOTION_FAIL:
        cloneDraft.loading = false;
        cloneDraft.error = action.payload;
        break;
      default:
        break;
    }
  });

export default promotionReducer;
