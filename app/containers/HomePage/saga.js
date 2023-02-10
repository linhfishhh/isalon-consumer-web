import { takeLatest, call, put } from 'redux-saga/effects';
import {
  blogService,
  bookingHomeService,
  bookingSearchService,
} from 'services';
import get from 'lodash/get';
import {
  getBannersSuccess,
  getBannersFail,
  getLatestBLogsSuccess,
  getLatestBLogsFail,
  getTopDealsSuccess,
  getTopDealsFail,
  getTopBrandsSuccess,
  getTopBrandsFail,
  getSearchHistorySuccess,
  getSearchHistoryFail,
} from './actions';
import {
  GET_BANNERS_REQUEST,
  GET_LATEST_BLOG_POSTS_REQUEST,
  GET_TOP_DEALS_REQUEST,
  GET_TOP_BRANDS_REQUEST,
  GET_SEARCH_HISTORY_REQUEST,
} from './constants';

export function* getBanners() {
  try {
    const response = yield call([bookingHomeService, 'getBanners']);
    yield put(getBannersSuccess(response));
  } catch (err) {
    yield put(getBannersFail(err));
  }
}

export function* getLatestBlogs() {
  try {
    const response = yield call([blogService, 'getLatestBlogs']);
    const posts = get(response, 'posts');
    yield put(getLatestBLogsSuccess(posts));
  } catch (err) {
    yield put(getLatestBLogsFail(err));
  }
}

export function* getTopDeals() {
  try {
    const response = yield call([bookingHomeService, 'getTopDeals']);
    yield put(getTopDealsSuccess(response));
  } catch (err) {
    yield put(getTopDealsFail(err));
  }
}

export function* getTopBrands() {
  try {
    const response = yield call([bookingHomeService, 'getTopBrands']);
    yield put(getTopBrandsSuccess(response));
  } catch (err) {
    yield put(getTopBrandsFail(err));
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

export default function* blogSaga() {
  yield takeLatest(GET_BANNERS_REQUEST, getBanners);
  yield takeLatest(GET_LATEST_BLOG_POSTS_REQUEST, getLatestBlogs);
  yield takeLatest(GET_TOP_DEALS_REQUEST, getTopDeals);
  yield takeLatest(GET_TOP_BRANDS_REQUEST, getTopBrands);
  yield takeLatest(GET_SEARCH_HISTORY_REQUEST, getSearchHistory);
}
