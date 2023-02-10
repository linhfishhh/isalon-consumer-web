/*
 *
 * BookingSearch actions
 *
 */
import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  SEARCH,
  GET_DISTRICT,
  ADD_SEARCH_HISTORY,
  CLEAN_DATA,
  CLEAN_DATA_RESULT,
} from './constants';

export const [
  searchRequest,
  searchSuccess,
  searchFail,
] = createSideEffectAction(SEARCH);

export const [
  getDistrictRequest,
  getDistrictSuccess,
  getDistrictFail,
] = createSideEffectAction(GET_DISTRICT);

export const [
  addSearchHistoryRequest,
  addSearchHistorySuccess,
  addSearchHistoryFail,
] = createSideEffectAction(ADD_SEARCH_HISTORY);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const cleanDataResultAction = createSingleAction(CLEAN_DATA_RESULT);
