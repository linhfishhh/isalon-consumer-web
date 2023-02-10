import { takeLatest, call, put } from 'redux-saga/effects';
import { searchService } from 'services';
import { get } from 'lodash';
import {
  getSearchHistorySuccess,
  getSearchHistoryFail,
  getHotKeywordsSuccess,
  getHotKeywordsFail,
  clearSearchHistorySuccess,
  clearSearchHistoryFail,
  getSuggestionKeywordsSuccess,
  getSuggestionKeywordsFail,
} from './actions';
import {
  GET_SEARCH_HISTORY_REQUEST,
  GET_HOT_KEYWORDS_REQUEST,
  CLEAR_SEARCH_HISTORY_REQUEST,
  GET_SUGGESTION_KEYWORDS_REQUEST,
} from './constants';

export function* getSearchHistory() {
  try {
    const response = yield call([searchService, 'getSearchHistory']);
    yield put(getSearchHistorySuccess(get(response, 'data')));
  } catch (err) {
    yield put(getSearchHistoryFail(err));
  }
}

export function* clearSearchHistory() {
  try {
    yield call([searchService, 'clearSearchHistory']);
    yield put(clearSearchHistorySuccess());
  } catch (err) {
    yield put(clearSearchHistoryFail(err));
  }
}

export function* getHotKeywords() {
  try {
    const response = yield call([searchService, 'getHotKeywords']);
    yield put(getHotKeywordsSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getHotKeywordsFail(err));
  }
}

export function* getSuggestionKeywords({ payload }) {
  try {
    const { keyword } = payload;
    const response = yield call(
      [searchService, 'getSuggestionKeywords'],
      keyword,
    );
    yield put(getSuggestionKeywordsSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getSuggestionKeywordsFail(err));
  }
}

// Individual exports for testing
export default function* productHomePageSaga() {
  yield takeLatest(GET_SEARCH_HISTORY_REQUEST, getSearchHistory);
  yield takeLatest(GET_HOT_KEYWORDS_REQUEST, getHotKeywords);
  yield takeLatest(CLEAR_SEARCH_HISTORY_REQUEST, clearSearchHistory);
  yield takeLatest(GET_SUGGESTION_KEYWORDS_REQUEST, getSuggestionKeywords);
}
