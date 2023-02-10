/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_BANNERS,
  GET_LATEST_BLOG_POSTS,
  GET_TOP_DEALS,
  GET_TOP_BRANDS,
  GET_SEARCH_HISTORY,
} from './constants';

export const [
  getBannersRequest,
  getBannersSuccess,
  getBannersFail,
] = createSideEffectAction(GET_BANNERS);

export const [
  getLatestBLogsRequest,
  getLatestBLogsSuccess,
  getLatestBLogsFail,
] = createSideEffectAction(GET_LATEST_BLOG_POSTS);

export const [
  getTopDealsRequest,
  getTopDealsSuccess,
  getTopDealsFail,
] = createSideEffectAction(GET_TOP_DEALS);

export const [
  getTopBrandsRequest,
  getTopBrandsSuccess,
  getTopBrandsFail,
] = createSideEffectAction(GET_TOP_BRANDS);

export const [
  getSearchHistoryRequest,
  getSearchHistorySuccess,
  getSearchHistoryFail,
] = createSideEffectAction(GET_SEARCH_HISTORY);
