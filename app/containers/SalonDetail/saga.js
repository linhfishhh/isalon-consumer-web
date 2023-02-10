import { takeLatest, call, put } from 'redux-saga/effects';
import { salonDetailService } from 'services';

import {
  GET_REQUEST,
  FAVORITE_REQUEST,
  FAVORITE_COLLECTION_REQUEST,
} from './constants';
import {
  getSuccess,
  getFail,
  favoriteSuccess,
  favoriteFail,
  favoriteCollectionSuccess,
  favoriteCollectionFail,
} from './actions';

export function* getSalonDetail({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call(
      [salonDetailService, 'getSalonDetail'],
      salonId,
    );
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* favoriteSalon({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call(
      [salonDetailService, 'favoriteSalonV2'],
      salonId,
    );
    yield put(favoriteSuccess(response));
  } catch (err) {
    yield put(favoriteFail(err));
  }
}

export function* favoriteCollection({ payload }) {
  try {
    const { collectionId } = payload;
    const response = yield call(
      [salonDetailService, 'favoriteCollection'],
      collectionId,
    );
    yield put(favoriteCollectionSuccess({ liked: response, collectionId }));
  } catch (err) {
    yield put(favoriteCollectionFail(err));
  }
}

export default function* salonDetailSaga() {
  yield takeLatest(GET_REQUEST, getSalonDetail);
  yield takeLatest(FAVORITE_REQUEST, favoriteSalon);
  yield takeLatest(FAVORITE_COLLECTION_REQUEST, favoriteCollection);
}
