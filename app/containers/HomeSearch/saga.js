import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingSearchService, profileService } from 'services';
import { getCoordsSearch } from 'utils/searchHelper';
import { GET_PROVINCES_REQUEST, GET_SEARCH_HINTS_REQUEST } from './constants';
import {
  getProvincesSuccess,
  getProvincesFail,
  getSearchHintsSuccess,
  getSearchHintsFail,
} from './actions';

export function* getProvinces() {
  try {
    const response = yield call([profileService, 'getProvinceList']);
    yield put(getProvincesSuccess(response));
  } catch (err) {
    yield put(getProvincesFail(err));
  }
}

export function* getSearchHints({ payload }) {
  try {
    const { keyword, province } = payload;
    const coords = getCoordsSearch({ address: province });
    const params = { keyword, ...coords };
    const response = yield call(
      [bookingSearchService, 'getSearchHints'],
      params,
    );
    yield put(getSearchHintsSuccess(response));
  } catch (err) {
    yield put(getSearchHintsFail(err));
  }
}

export default function* searchSaga() {
  yield takeLatest(GET_PROVINCES_REQUEST, getProvinces);
  yield takeLatest(GET_SEARCH_HINTS_REQUEST, getSearchHints);
}
