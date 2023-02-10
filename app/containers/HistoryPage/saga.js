import { takeLatest, call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { bookingService, shopService } from 'services';
import {
  getBookingWaitingSuccess,
  getBookingWaitingFail,
  getShoppingWaitingSuccess,
  getShoppingWaitingFail,
} from './actions';
import {
  GET_BOOKING_WAITING_REQUEST,
  GET_SHOPPING_WAITING_REQUEST,
} from './constants';

export function* getBookingWaiting() {
  try {
    const response = yield call([bookingService, 'getBookingWaiting']);
    yield put(getBookingWaitingSuccess(response));
  } catch (err) {
    yield put(getBookingWaitingFail(err));
  }
}

export function* getShoppingWaiting({ payload }) {
  try {
    const response = yield call([shopService, 'getHistories'], payload);
    yield put(getShoppingWaitingSuccess(get(response, 'data', {})));
  } catch (err) {
    yield put(getShoppingWaitingFail(err));
  }
}

export default function* historySaga() {
  yield takeLatest(GET_BOOKING_WAITING_REQUEST, getBookingWaiting);
  yield takeLatest(GET_SHOPPING_WAITING_REQUEST, getShoppingWaiting);
}
