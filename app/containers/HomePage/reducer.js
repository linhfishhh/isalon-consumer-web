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
  GET_LATEST_BLOG_POSTS_SUCCESS,
  GET_TOP_DEALS_SUCCESS,
  GET_TOP_BRANDS_SUCCESS,
  GET_SEARCH_HISTORY_SUCCESS,
} from './constants';

export const initialState = {
  fetched: false,
  banners: [],
  latestBlogs: [],
  topDeals: [],
  topBrands: [],
  searchHistories: [],
};

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_BANNERS_SUCCESS: {
        cloneDraft.banners = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_LATEST_BLOG_POSTS_SUCCESS: {
        cloneDraft.latestBlogs = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_TOP_DEALS_SUCCESS: {
        cloneDraft.topDeals = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_TOP_BRANDS_SUCCESS: {
        cloneDraft.topBrands = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_SEARCH_HISTORY_SUCCESS: {
        cloneDraft.searchHistories = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      default:
        break;
    }
  });

export default homeReducer;
