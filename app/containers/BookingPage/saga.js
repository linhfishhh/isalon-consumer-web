import { takeLatest, call, put, select } from 'redux-saga/effects';
import { bookingService, salonDetailService, walletService } from 'services';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import { getLoggedInUser } from 'utils/auth';
import {
  GET_BOOKING_ITEMS_REQUEST,
  GET_SALON_INFO_REQUEST,
  GET_SALON_OPEN_TIME_REQUEST,
  ADD_BOOKING_REQUEST,
  PRE_PAY_BOOKING_COIN_REQUEST,
} from './constants';
import {
  getBookingItemsSuccess,
  getBookingItemsFail,
  getSalonInfoSuccess,
  getSalonInfoFail,
  getSalonOpenTimeSuccess,
  getSalonOpenTimeFail,
  addBookingSuccess,
  addBookingFail,
  prePayBookingCoinSuccess,
  prePayBookingCoinFail,
} from './actions';
import { makeSelectBookingItems } from './selectors';

export function* getBookingItems({ payload }) {
  try {
    const { salonId, items } = payload;
    const params = { items };
    const response = yield call(
      [bookingService, 'getBookingItems'],
      salonId,
      params,
    );
    yield put(getBookingItemsSuccess(response));
  } catch (err) {
    yield put(getBookingItemsFail(err));
  }
}

export function* getSalonInfo({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call([salonDetailService, 'getSalonInfo'], salonId);
    yield put(getSalonInfoSuccess(response));
  } catch (err) {
    yield put(getSalonInfoFail(err));
  }
}

export function* getSalonOpenTime({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call(
      [salonDetailService, 'getSalonOpenTime'],
      salonId,
    );
    yield put(getSalonOpenTimeSuccess(response));
  } catch (err) {
    yield put(getSalonOpenTimeFail(err));
  }
}

export function* addBooking({ payload }) {
  const { bookingInfo, bookingItems, spendMaxCoin, success, failure } = payload;
  try {
    const items = bookingItems.items.map(item => ({
      id: item.id,
      qty: item.qty,
      option_id: item.option ? item.option.id : undefined,
    }));
    const { salonId, date, time } = bookingInfo;
    const params = {
      salon_id: salonId,
      items,
      service_time: `${format(Date.parse(date), 'yyyy-MM-dd')} ${time}:00`,
      payment_method: bookingInfo.payment.id,
      spend_max_coin: spendMaxCoin,
    };
    const response = yield call([bookingService, 'addBookingV2'], params);
    if (response) {
      success(response);
      yield put(addBookingSuccess(response));
    }
  } catch (err) {
    failure(err);
    yield put(addBookingFail(err));
  }
}

export function* prePayBookingCoin({ payload }) {
  try {
    const bookingItems = yield select(makeSelectBookingItems());
    const { spendMaxCoin } = payload;
    const user = getLoggedInUser();
    const total = bookingItems.items.reduce(
      (acc, item) =>
        !isEmpty(item.option)
          ? acc + item.option.final_price * item.qty
          : acc + item.price * item.qty,
      0,
    );
    const params = {
      spendMaxCoin,
      total,
      userId: user.user_id,
    };
    const response = yield call([walletService, 'prePayBookingCoin'], params);
    yield put(prePayBookingCoinSuccess(response));
  } catch (err) {
    yield put(prePayBookingCoinFail(err));
  }
}

export default function* bookingPageSaga() {
  yield takeLatest(GET_BOOKING_ITEMS_REQUEST, getBookingItems);
  yield takeLatest(GET_SALON_INFO_REQUEST, getSalonInfo);
  yield takeLatest(GET_SALON_OPEN_TIME_REQUEST, getSalonOpenTime);
  yield takeLatest(ADD_BOOKING_REQUEST, addBooking);
  yield takeLatest(PRE_PAY_BOOKING_COIN_REQUEST, prePayBookingCoin);
}
