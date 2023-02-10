/*
 *
 * BookingHistoryPage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_BOOKING_HISTORY_REQUEST,
  GET_BOOKING_HISTORY_SUCCESS,
  SHOW_BOOKING_HISTORY_DETAIL,
  HIDE_BOOKING_HISTORY_DETAIL,
  CANCEL_BOOKING_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  bookingHistory: {
    items: [],
    isLast: true,
  },
  showHistoryDetail: false,
};

export const splitDayAndTime = datetimeString => {
  if (datetimeString) {
    return {
      time: datetimeString.split('-')[0].trim(),
      date: datetimeString.split('-')[1].trim(),
    };
  }
  return {};
};

const parseToNewBooking = data => {
  const dateTime = splitDayAndTime(data.date);
  return {
    id: data.id,
    service: data.service,
    salon: {
      name: data.salon,
    },
    price: data.price,
    status: data.status,
    can_cancel: data.can_cancel,
    amount_coin: data.amount_coin,
    amount_money: data.amount_money,
    ...dateTime,
  };
};

const bookingHistoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_BOOKING_HISTORY_REQUEST: {
        const payload = get(action, 'payload');
        if (payload.page === 1) {
          cloneDraft.loading = true;
        }
        break;
      }
      case GET_BOOKING_HISTORY_SUCCESS: {
        const payload = get(action, 'payload');
        const { currentPage = 1, isLastPage, items = [] } = payload;
        const newItems = items.map(item => parseToNewBooking(item));
        const obj = get(cloneDraft, 'bookingHistory', {});
        if (currentPage === 1) {
          obj.items = newItems;
        } else {
          obj.items = [...obj.items, ...newItems];
        }
        obj.isLast = isLastPage;
        cloneDraft.bookingHistory = obj;
        cloneDraft.loading = false;
        break;
      }
      case SHOW_BOOKING_HISTORY_DETAIL: {
        cloneDraft.showHistoryDetail = get(action, 'payload', false);
        break;
      }
      case HIDE_BOOKING_HISTORY_DETAIL: {
        cloneDraft.showHistoryDetail = false;
        break;
      }
      case CANCEL_BOOKING_ORDER_SUCCESS: {
        const orderId = get(action, 'payload');
        const { items } = cloneDraft.bookingHistory;
        if (orderId) {
          const orderItem = items.find(item => item.id === orderId);
          orderItem.can_cancel = false;
          orderItem.status = -1;
        }
        cloneDraft.bookingHistory.items = items;
        break;
      }
      default:
        break;
    }
  });

export default bookingHistoryPageReducer;
