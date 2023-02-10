/*
 *
 * BookingPage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  changeQuantityServiceLS,
  removeServiceBookingLS,
} from 'utils/localStorage/booking';
import {
  GET_BOOKING_ITEMS_SUCCESS,
  GET_SALON_INFO_SUCCESS,
  GET_SALON_OPEN_TIME_SUCCESS,
  CHANGE_QUANTITY,
  REMOVE_SERVICE,
  ADD_BOOKING_SUCCESS,
  PRE_PAY_BOOKING_COIN_SUCCESS,
} from './constants';

export const initialState = {
  bookingItems: {},
  salonInfo: {},
  salonOpenTime: {},
  error: {},
  bookingStatus: false,
  bookingCoin: {},
};

const changeQuantityService = (booking, payload) => {
  const { salonId, id, qty } = payload;
  changeQuantityServiceLS(salonId, id, qty);
  const services = booking.items.map(item => {
    if (item.id === id) {
      return { ...item, qty };
    }
    return item;
  });
  return { ...booking, items: services };
};

const removeService = (booking, payload) => {
  const { salonId, id } = payload;
  removeServiceBookingLS(salonId, id);
  const services = booking.items.filter(item => item.id !== id);
  return { ...booking, items: services };
};

const bookingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_BOOKING_ITEMS_SUCCESS: {
        draftClone.bookingItems = get(action, 'payload');
        break;
      }
      case GET_SALON_INFO_SUCCESS: {
        draftClone.salonInfo = get(action, 'payload');
        break;
      }
      case GET_SALON_OPEN_TIME_SUCCESS: {
        draftClone.salonOpenTime = get(action, 'payload');
        break;
      }
      case CHANGE_QUANTITY: {
        const payload = get(action, 'payload');
        draftClone.bookingItems = changeQuantityService(
          state.bookingItems,
          payload,
        );
        break;
      }
      case REMOVE_SERVICE: {
        const payload = get(action, 'payload');
        draftClone.bookingItems = removeService(state.bookingItems, payload);
        break;
      }
      case ADD_BOOKING_SUCCESS: {
        draftClone.bookingStatus = true;
        break;
      }
      case PRE_PAY_BOOKING_COIN_SUCCESS: {
        draftClone.bookingCoin = get(action, 'payload.data', {});
        break;
      }
      default:
        break;
    }
  });

export default bookingPageReducer;
