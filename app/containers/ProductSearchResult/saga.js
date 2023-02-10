import { takeLatest, call, put } from 'redux-saga/effects';
import { searchService, shopService } from 'services';
import get from 'lodash/get';
import {
  getFilterOptionsSuccess,
  getFilterOptionsFail,
  fetchSearchResultSuccess,
  fetchSearchResultFail,
} from './actions';
import {
  GET_FILTER_OPTIONS_REQUEST,
  FETCH_SEARCH_RESULT_REQUEST,
} from './constants';

function* getFilterOptions() {
  try {
    const response = yield call([searchService, 'getFilterOptions']);
    yield put(getFilterOptionsSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getFilterOptionsFail(err));
  }
}

function* findProducts({ payload }) {
  try {
    const { findType } = payload;
    let response;
    if (findType === 'recommended') {
      response = yield call([searchService, 'getSuggestionProducts'], payload);
    } else if (findType === 'flashsale') {
      response = yield call([shopService, 'getFlashSaleProducts'], payload);
    } else {
      response = yield call([searchService, 'findProducts'], payload);
    }
    yield put(fetchSearchResultSuccess(get(response, 'data')));
  } catch (err) {
    yield put(fetchSearchResultFail(err));
  }
}

// Individual exports for testing
export default function* productSearchResultSaga() {
  yield takeLatest(GET_FILTER_OPTIONS_REQUEST, getFilterOptions);
  yield takeLatest(FETCH_SEARCH_RESULT_REQUEST, findProducts);
}
