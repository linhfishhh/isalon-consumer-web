/*
 *
 * ProductSearch reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_SEARCH_HISTORY_SUCCESS,
  GET_HOT_KEYWORDS_SUCCESS,
  CLEAR_SEARCH_HISTORY_SUCCESS,
  GET_SUGGESTION_KEYWORDS_SUCCESS,
} from './constants';

export const initialState = {
  fetched: false,
  searchHistories: [],
  hotKeywords: [],
  suggestionKeywords: [],
};

const productSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_SEARCH_HISTORY_SUCCESS: {
        const keywords = get(action, 'payload', []);
        cloneDraft.searchHistories = keywords;
        break;
      }
      case CLEAR_SEARCH_HISTORY_SUCCESS: {
        cloneDraft.searchHistories = [];
        break;
      }
      case GET_HOT_KEYWORDS_SUCCESS: {
        const keywords = get(action, 'payload', []);
        cloneDraft.hotKeywords = keywords;
        cloneDraft.fetched = true;
        break;
      }
      case GET_SUGGESTION_KEYWORDS_SUCCESS: {
        const keywords = get(action, 'payload', []);
        cloneDraft.suggestionKeywords = keywords;
        break;
      }
      default:
        break;
    }
  });

export default productSearchReducer;
