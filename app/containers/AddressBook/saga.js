import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService } from 'services';
import {
  getMyAddressesSuccess,
  getMyAddressesFail,
  deleteMyAddressSuccess,
  deleteMyAddressFail,
} from './actions';
import {
  GET_MY_ADDRESSES_REQUEST,
  DELETE_MY_ADDRESS_REQUEST,
} from './constants';

export function* getMyAddresses() {
  try {
    const response = yield call([profileService, 'getMyAddresses']);
    yield put(getMyAddressesSuccess(response));
  } catch (err) {
    yield put(getMyAddressesFail(err));
  }
}

export function* deleteMyAddress({ payload }) {
  try {
    const response = yield call([profileService, 'deleteMyAddress'], payload);
    yield put(deleteMyAddressSuccess(response));
    const { callback } = payload;
    if (callback) {
      callback();
    }
  } catch (err) {
    yield put(deleteMyAddressFail(err));
  }
}

export default function* addressBookSaga() {
  yield takeLatest(GET_MY_ADDRESSES_REQUEST, getMyAddresses);
  yield takeLatest(DELETE_MY_ADDRESS_REQUEST, deleteMyAddress);
}
