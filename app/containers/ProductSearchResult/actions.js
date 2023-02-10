/*
 *
 * ProductSearchResult actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_FILTER_OPTIONS,
  FETCH_SEARCH_RESULT,
  CLEAR_SEARCH_RESULT,
} from './constants';

export const [
  getFilterOptionsRequest,
  getFilterOptionsSuccess,
  getFilterOptionsFail,
] = createSideEffectAction(GET_FILTER_OPTIONS);

export const [
  fetchSearchResultRequest,
  fetchSearchResultSuccess,
  fetchSearchResultFail,
] = createSideEffectAction(FETCH_SEARCH_RESULT);

export const clearSearchResultRequest = createSingleAction(CLEAR_SEARCH_RESULT);
