import { takeLatest, call, put } from 'redux-saga/effects';

import { bookingSearchService, profileService } from 'services';
import { searchParamsDefault, getCoordsSearch } from 'utils/searchHelper';

import {
  SEARCH_REQUEST,
  GET_DISTRICT_REQUEST,
  ADD_SEARCH_HISTORY_REQUEST,
} from './constants';
import {
  searchSuccess,
  searchFail,
  getDistrictSuccess,
  getDistrictFail,
  addSearchHistorySuccess,
  addSearchHistoryFail,
} from './actions';

export function* searchSalon({ payload }) {
  try {
    const { filter, province } = payload;
    const coords = getCoordsSearch({
      address: province,
      viewType: filter.view_type,
    });
    const params = searchParamsDefault({ ...coords, ...filter });
    const response = yield call([bookingSearchService, 'searchSalon'], params);
    yield put(searchSuccess(response));
  } catch (err) {
    yield put(searchFail(err));
  }
}

export function* getDistrictList({ payload }) {
  try {
    const { provinceId } = payload;
    const response = yield call(
      [profileService, 'getDistrictList'],
      provinceId,
    );
    yield put(getDistrictSuccess(response));
  } catch (err) {
    yield put(getDistrictFail(err));
  }
}

export function* addSearchHistory({ payload }) {
  try {
    const response = yield call(
      [bookingSearchService, 'addSearchHistory'],
      payload,
    );
    yield put(addSearchHistorySuccess(response));
  } catch (err) {
    yield put(addSearchHistoryFail(err));
  }
}

export default function* bookingSearchSaga() {
  yield takeLatest(SEARCH_REQUEST, searchSalon);
  yield takeLatest(GET_DISTRICT_REQUEST, getDistrictList);
  yield takeLatest(ADD_SEARCH_HISTORY_REQUEST, addSearchHistory);
}
