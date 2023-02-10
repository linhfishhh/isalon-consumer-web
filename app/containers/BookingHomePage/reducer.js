/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { get } from 'lodash';
import {
  GET_BANNERS_SUCCESS,
  GET_SALONS_NEW_SUCCESS,
  GET_TOP_CITIES_SUCCESS,
  GET_SEARCH_HISTORY_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  fetched: false,
  banners: [],
  salonsNew: [],
  topCities: [],
  searchHistories: [],
};

const homeBookingReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_BANNERS_SUCCESS: {
        cloneDraft.banners = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_SALONS_NEW_SUCCESS: {
        cloneDraft.salonsNew = get(action, 'payload.items', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_TOP_CITIES_SUCCESS: {
        cloneDraft.topCities = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_SEARCH_HISTORY_SUCCESS: {
        cloneDraft.searchHistories = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      default: {
        break;
      }
    }
  });

export default homeBookingReducer;
