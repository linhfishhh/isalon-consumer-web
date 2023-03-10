/*
 *
 * GlobalState constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/GLOBAL_STATE';

export const SET_CURRENT_LOCATION = `${CONTEXT}/SET_CURRENT_LOCATION`;
export const SET_PROVINCE_LIST = `${CONTEXT}/SET_PROVINCE_LIST`;
export const GET_DEFAULT_POSITION = `${CONTEXT}/GET_DEFAULT_POSITION`;
export const GET_PROVINCE_BY_POSITION = `${CONTEXT}/GET_PROVINCE_BY_POSITION`;
export const REFRESH_LOCATION = `${CONTEXT}/REFRESH_LOCATION`;

export const GET_GLOBAL_CONFIG = `${CONTEXT}/GET_GLOBAL_CONFIG`;
export const UPDATE_STACK_NUMBER_PAGE = `${CONTEXT}/UPDATE_STACK_NUMBER_PAGE`;
export const GET_SEARCH_CONFIG = `${CONTEXT}/GET_SEARCH_CONFIG`;

export const [
  GET_GLOBAL_CONFIG_REQUEST,
  GET_GLOBAL_CONFIG_SUCCESS,
  GET_GLOBAL_CONFIG_FAIL,
] = createActionType(GET_GLOBAL_CONFIG);

export const [
  GET_SEARCH_CONFIG_REQUEST,
  GET_SEARCH_CONFIG_SUCCESS,
  GET_SEARCH_CONFIG_FAIL,
] = createActionType(GET_SEARCH_CONFIG);
