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
  GET_SALONS_NEW,
  GET_TOP_CITIES,
  GET_SEARCH_HISTORY,
} from './constants';

export const [
  getBannersRequest,
  getBannersSuccess,
  getBannersFail,
] = createSideEffectAction(GET_BANNERS);

export const [
  getSalonsNewRequest,
  getSalonsNewSuccess,
  getSalonsNewFail,
] = createSideEffectAction(GET_SALONS_NEW);

export const [
  getTopCitiesRequest,
  getTopCitiesSuccess,
  getTopCitiesFail,
] = createSideEffectAction(GET_TOP_CITIES);

export const [
  getSearchHistoryRequest,
  getSearchHistorySuccess,
  getSearchHistoryFail,
] = createSideEffectAction(GET_SEARCH_HISTORY);
