import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingService, legacyProfileService, shopService } from 'services';
import get from 'lodash/get';
import { updateLoggedInUser } from 'utils/auth';
import { updateUserInfoAction } from 'containers/Authentication/actions';
import {
  getUserProfileSuccess,
  getUserProfileFail,
  getBookingHistorySuccess,
  getBookingHistoryFail,
  updateProfileSuccess,
  updateProfileFail,
  getFavoriteProductCountSuccess,
  getFavoriteProductCountFail,
} from './actions';
import {
  GET_USER_PROFILE_REQUEST,
  GET_BOOKING_HISTORY_REQUEST,
  UPDATE_PROFILE_REQUEST,
  GET_FAVORITE_PRODUCT_COUNT_REQUEST,
} from './constants';

export function* getUserProfile() {
  try {
    const response = yield call([legacyProfileService, 'getProfile']);
    yield put(getUserProfileSuccess(response));
  } catch (err) {
    yield put(getUserProfileFail(err));
  }
}

export function* updateProfile({ payload }) {
  try {
    const response = yield call(
      [legacyProfileService, 'updateProfile'],
      payload,
    );
    const userInfo = {
      name: response.name,
      email: response.email,
      avatar: response.avatar.uri,
    };
    updateLoggedInUser(userInfo);
    yield put(updateUserInfoAction(userInfo));
    yield put(updateProfileSuccess(response));
  } catch (err) {
    yield put(updateProfileFail(get(err, 'response.data')));
  }
}

export function* getBookingHistories({ payload }) {
  try {
    const response = yield call([bookingService, 'getHistories'], payload);
    yield put(getBookingHistorySuccess(response));
  } catch (err) {
    yield put(getBookingHistoryFail(err));
  }
}

export function* getFavoriteProductCount() {
  try {
    const response = yield call([shopService, 'getFavoriteProductCount']);
    yield put(getFavoriteProductCountSuccess(response));
  } catch (err) {
    yield put(getFavoriteProductCountFail(err));
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_USER_PROFILE_REQUEST, getUserProfile);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
  yield takeLatest(GET_BOOKING_HISTORY_REQUEST, getBookingHistories);
  yield takeLatest(GET_FAVORITE_PRODUCT_COUNT_REQUEST, getFavoriteProductCount);
}
