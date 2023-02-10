/*
 *
 * BookingHistoryDetailPage reducer
 *
 */
import produce from 'immer';
import { get, isEmpty } from 'lodash';
import {
  GET_BOOKING_HISTORY_DETAIL_SUCCESS,
  CLEAR_BOOKING_HISTORY_DETAIL,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
} from './constants';

export const initialState = {
  detail: {},
  error: {},
};

const bookingHistoryDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_BOOKING_HISTORY_DETAIL_SUCCESS: {
        const payload = get(action, 'payload', {});
        draftClone.detail = payload;
        break;
      }
      case CLEAR_BOOKING_HISTORY_DETAIL: {
        if (!isEmpty(draftClone.detail)) {
          draftClone.detail = {};
        }
        break;
      }
      case CANCEL_BOOKING_SUCCESS: {
        draftClone.detail.can_cancel = false;
        draftClone.detail.status = -1;
        break;
      }
      case CANCEL_BOOKING_FAIL: {
        draftClone.error = get(action, 'payload', {});
        break;
      }
      default:
        break;
    }
  });

export default bookingHistoryDetailPageReducer;
