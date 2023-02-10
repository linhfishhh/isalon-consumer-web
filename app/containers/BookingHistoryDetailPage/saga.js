import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingService } from 'services';
import { cancelBookingOrderSuccess } from 'containers/BookingHistoryPage/actions';
import {
  getBookingHistoryDetailSuccess,
  getBookingHistoryDetailFail,
  cancelBookingSuccess,
  cancelBookingFail,
} from './actions';
import {
  GET_BOOKING_HISTORY_DETAIL_REQUEST,
  CANCEL_BOOKING_REQUEST,
} from './constants';

export function* getBookingHistoryDetail({ payload }) {
  try {
    const response = yield call([bookingService, 'getHistoryDetail'], payload);
    yield put(getBookingHistoryDetailSuccess(response));
  } catch (err) {
    yield put(getBookingHistoryDetailFail(err));
  }
}

export function* cancelBooking({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([bookingService, 'cancelBooking'], id);
    if (response) {
      yield put(cancelBookingOrderSuccess(id));
      yield put(cancelBookingSuccess());
    }
  } catch (err) {
    yield put(cancelBookingFail(err));
  }
}

export default function* bookingHistorySaga() {
  yield takeLatest(GET_BOOKING_HISTORY_DETAIL_REQUEST, getBookingHistoryDetail);
  yield takeLatest(CANCEL_BOOKING_REQUEST, cancelBooking);
}
