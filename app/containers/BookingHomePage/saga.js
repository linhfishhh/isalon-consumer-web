import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingHomeService, bookingSearchService } from 'services';
import { searchParamsDefault, getCoordsSearch } from 'utils/searchHelper';
import { viewTypes } from 'utils/enums';
import {
  GET_BANNERS_REQUEST,
  GET_SALONS_NEW_REQUEST,
  GET_TOP_CITIES_REQUEST,
  GET_SEARCH_HISTORY_REQUEST,
} from './constants';
import {
  getBannersSuccess,
  getBannersFail,
  getSalonsNewSuccess,
  getSalonsNewFail,
  getTopCitiesSuccess,
  getTopCitiesFail,
  getSearchHistorySuccess,
  getSearchHistoryFail,
} from './actions';

export function* getBanners() {
  try {
    const response = yield call([bookingHomeService, 'getBanners']);
    yield put(getBannersSuccess(response));
  } catch (err) {
    yield put(getBannersFail(err));
  }
}

export function* getSalonsNew({ payload }) {
  const { provinceId = -1 } = payload;
  try {
    const viewType = viewTypes.valueWithIndex(1);
    const coords = getCoordsSearch({ viewType });
    const params = searchParamsDefault({
      ...coords,
      view_type: viewType,
      search_type: 'salon',
      location: [provinceId],
      location_lv: 1,
    });
    const response = yield call([bookingHomeService, 'getSalonsNew'], params);
    yield put(getSalonsNewSuccess(response));
  } catch (err) {
    yield put(getSalonsNewFail(err));
  }
}

export function* getTopCities() {
  try {
    const response = yield call([bookingHomeService, 'getTopCities']);
    yield put(getTopCitiesSuccess(response));
  } catch (err) {
    yield put(getTopCitiesFail(err));
  }
}

export function* getSearchHistory() {
  try {
    const response = yield call([bookingSearchService, 'getSearchHistory']);
    yield put(getSearchHistorySuccess(response));
  } catch (err) {
    yield put(getSearchHistoryFail(err));
  }
}

export default function* homeBookingSaga() {
  yield takeLatest(GET_BANNERS_REQUEST, getBanners);
  yield takeLatest(GET_SALONS_NEW_REQUEST, getSalonsNew);
  yield takeLatest(GET_TOP_CITIES_REQUEST, getTopCities);
  yield takeLatest(GET_SEARCH_HISTORY_REQUEST, getSearchHistory);
}
