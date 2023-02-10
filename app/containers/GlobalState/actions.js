/*
 *
 * GlobalState actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  SET_CURRENT_LOCATION,
  GET_DEFAULT_POSITION,
  GET_PROVINCE_BY_POSITION,
  SET_PROVINCE_LIST,
  REFRESH_LOCATION,
  GET_GLOBAL_CONFIG,
  UPDATE_STACK_NUMBER_PAGE,
  GET_SEARCH_CONFIG,
} from './constants';

export const setCurrentLocationAction = createSingleAction(
  SET_CURRENT_LOCATION,
);

export const getDefaultPositionAction = createSingleAction(
  GET_DEFAULT_POSITION,
);

export const getProvinceByPositionAction = createSingleAction(
  GET_PROVINCE_BY_POSITION,
);

export const setProvinceListAction = createSingleAction(SET_PROVINCE_LIST);

export const refreshLocationAction = createSingleAction(REFRESH_LOCATION);

export const updateStackNumberPageAction = createSingleAction(
  UPDATE_STACK_NUMBER_PAGE,
);

export const [
  getGlobalConfigRequest,
  getGlobalConfigSuccess,
  getGlobalConfigFail,
] = createSideEffectAction(GET_GLOBAL_CONFIG);

export const [
  getSearchConfigRequest,
  getSearchConfigSuccess,
  getSearchConfigFail,
] = createSideEffectAction(GET_SEARCH_CONFIG);
