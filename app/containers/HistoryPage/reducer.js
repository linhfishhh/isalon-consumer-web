/*
 *
 * History reducer
 *
 */
import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import {
  GET_BOOKING_WAITING_SUCCESS,
  GET_SHOPPING_WAITING_SUCCESS,
  CLEAN_DATA,
  CHANGE_TYPE_ACTIVE,
} from './constants';

export const initialState = {
  loadingBooking: true,
  bookingWaiting: {
    orders: [],
    total: 0,
  },
  loadingShopping: true,
  shoppingWaiting: {
    content: [],
    isLast: false,
  },
  typeActive: 0,
};

const historyReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_BOOKING_WAITING_SUCCESS: {
        const payload = get(action, 'payload');
        cloneDraft.bookingWaiting = payload;
        cloneDraft.loadingBooking = false;
        break;
      }
      case GET_SHOPPING_WAITING_SUCCESS: {
        const payload = get(action, 'payload');
        const { last, content = [] } = payload;
        cloneDraft.shoppingWaiting = { content, last };
        cloneDraft.loadingShopping = false;
        break;
      }
      case CLEAN_DATA: {
        const payload = get(action, 'payload');
        forEach(isEmpty(payload) ? keysIn(cloneDraft) : payload, key => {
          set(cloneDraft, key, initialState[key]);
        });
        break;
      }
      case CHANGE_TYPE_ACTIVE: {
        const typeActive = get(action, 'payload.typeActive');
        cloneDraft.typeActive = typeActive;
        break;
      }
      default:
        break;
    }
  });

export default historyReducer;
