/*
 *
 * ProductSearchResult reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_FILTER_OPTIONS_SUCCESS,
  FETCH_SEARCH_RESULT_SUCCESS,
  CLEAR_SEARCH_RESULT,
} from './constants';

export const initialState = {
  filterOptions: [],
  searchResult: {},
};

/* eslint-disable default-case, no-param-reassign */
const productSearchResultReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_FILTER_OPTIONS_SUCCESS: {
        cloneDraft.filterOptions = get(action, 'payload', []);
        break;
      }
      case FETCH_SEARCH_RESULT_SUCCESS: {
        cloneDraft.searchResult = get(action, 'payload', {});
        break;
      }
      case CLEAR_SEARCH_RESULT: {
        cloneDraft.searchResult = {};
        break;
      }
    }
  });

export default productSearchResultReducer;
