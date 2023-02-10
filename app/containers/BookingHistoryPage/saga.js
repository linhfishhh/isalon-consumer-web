import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingService } from 'services';
import {
  getBookingHistorySuccess,
  getBookingHistoryFail,
  cancelBookingOrderSuccess,
  cancelBookingOrderFail,
} from './actions';
import {
  GET_BOOKING_HISTORY_REQUEST,
  CANCEL_BOOKING_ORDER_REQUEST,
} from './constants';

export function* getBookingHistories({ payload }) {
  try {
    const response = yield call([bookingService, 'getHistories'], payload);
    yield put(getBookingHistorySuccess(response));
  } catch (err) {
    yield put(getBookingHistoryFail(err));
  }
}

export function* cancelBookingOrder({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([bookingService, 'cancelBooking'], id);
    if (response) {
      yield put(cancelBookingOrderSuccess(id));
    }
  } catch (err) {
    yield put(cancelBookingOrderFail(err));
  }
}

export default function* bookingHistorySaga() {
  yield takeLatest(GET_BOOKING_HISTORY_REQUEST, getBookingHistories);
  yield takeLatest(CANCEL_BOOKING_ORDER_REQUEST, cancelBookingOrder);
}
