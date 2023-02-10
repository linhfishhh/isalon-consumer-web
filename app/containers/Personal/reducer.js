/*
 *
 * Personal reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_USER_PROFILE_SUCCESS,
  GET_BOOKING_HISTORY_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  SHOW_BOOKING_HISTORY_DETAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PHONE_SUCCESS,
  GET_FAVORITE_PRODUCT_COUNT_SUCCESS,
  CLEAR_DATA,
} from './constants';

export const initialState = {
  profile: {
    statistic: {
      bookingOrderCount: 0,
      shoppingOrderCount: 0,
      favoriteCount: 0,
    },
  },
  bookingHistories: [],
  favoriteProductCount: 0,
  showDetail: false,
  errors: {},
};

const personalReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_USER_PROFILE_SUCCESS: {
        cloneDraft.profile = get(action, 'payload', {});
        break;
      }
      case GET_BOOKING_HISTORY_SUCCESS: {
        cloneDraft.bookingHistories = get(action, 'payload.items', []);
        break;
      }
      case SHOW_BOOKING_HISTORY_DETAIL: {
        cloneDraft.showDetail = get(action, 'payload', false);
        break;
      }
      case UPDATE_PROFILE_SUCCESS: {
        const payload = get(action, 'payload', {});
        cloneDraft.profile = payload;
        cloneDraft.errors = {
          message: 'Cập nhật tài khoản thành công',
          severity: 'success',
        };
        break;
      }
      case UPDATE_PHONE_SUCCESS: {
        const phone = get(action, 'payload.phone', '');
        const profile = { ...cloneDraft.profile };
        profile.phone = phone;
        cloneDraft.profile = profile;
        cloneDraft.errors = {
          message: 'Cập nhật số điện thoại thành công',
          severity: 'success',
        };
        break;
      }
      case UPDATE_PROFILE_FAIL: {
        const payload = get(action, 'payload', {});
        cloneDraft.errors = { ...payload, severity: 'error' };
        break;
      }
      case GET_FAVORITE_PRODUCT_COUNT_SUCCESS: {
        const count = get(action, 'payload.data.total', 0);
        cloneDraft.favoriteProductCount = count;
        break;
      }
      case CLEAR_DATA: {
        cloneDraft.errors = {};
        break;
      }
      default:
        break;
    }
  });

export default personalReducer;
