/*
 *
 * ProductSearch actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  GET_HOT_KEYWORDS,
  GET_SUGGESTION_KEYWORDS,
} from './constants';

export const [
  getSearchHistoryRequest,
  getSearchHistorySuccess,
  getSearchHistoryFail,
] = createSideEffectAction(GET_SEARCH_HISTORY);

export const [
  clearSearchHistoryRequest,
  clearSearchHistorySuccess,
  clearSearchHistoryFail,
] = createSideEffectAction(CLEAR_SEARCH_HISTORY);

export const [
  getHotKeywordsRequest,
  getHotKeywordsSuccess,
  getHotKeywordsFail,
] = createSideEffectAction(GET_HOT_KEYWORDS);

export const [
  getSuggestionKeywordsRequest,
  getSuggestionKeywordsSuccess,
  getSuggestionKeywordsFail,
] = createSideEffectAction(GET_SUGGESTION_KEYWORDS);
