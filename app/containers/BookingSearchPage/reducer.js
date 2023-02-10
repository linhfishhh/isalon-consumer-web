/*
 *
 * BookingSearch reducer
 *
 */
import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
  CLEAN_DATA,
  CLEAN_DATA_RESULT,
} from './constants';

export const initialState = {
  loading: true,
  searchResult: {
    is_last_page: false,
    items: [],
    total: 0,
    page: 0,
  },
  districts: [],
  error: {},
};

const bookingSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SEARCH_REQUEST: {
        cloneDraft.loading = true;
        break;
      }
      case SEARCH_SUCCESS: {
        const result = get(action, 'payload');
        if (result.page > 1) {
          const oldItems = state.searchResult.items;
          result.items = oldItems.concat(result.items);
        }
        cloneDraft.searchResult = result;
        cloneDraft.loading = false;
        break;
      }
      case GET_DISTRICT_SUCCESS: {
        cloneDraft.districts = get(action, 'payload.data', []);
        break;
      }
      case GET_DISTRICT_FAIL:
      case SEARCH_FAIL: {
        cloneDraft.error = get(action, 'payload');
        cloneDraft.loading = false;
        break;
      }
      case CLEAN_DATA: {
        const payload = get(action, 'payload');
        forEach(isEmpty(payload) ? keysIn(cloneDraft) : payload, key => {
          set(cloneDraft, key, initialState[key]);
        });
        break;
      }
      case CLEAN_DATA_RESULT: {
        cloneDraft.searchResult = initialState.searchResult;
        cloneDraft.loading = true;
        break;
      }
      default:
        break;
    }
  });

export default bookingSearchReducer;
