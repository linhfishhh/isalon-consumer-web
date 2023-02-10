/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/BOOKING_HOME';

export const GET_BANNERS = `${CONTEXT}/GET_BANNERS`;
export const GET_SALONS_NEW = `${CONTEXT}/GET_SALONS_NEW`;
export const GET_TOP_CITIES = `${CONTEXT}/GET_TOP_CITIES`;
export const GET_SEARCH_HISTORY = `${CONTEXT}/GET_SEARCH_HISTORY`;

export const [
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAIL,
] = createActionType(GET_BANNERS);

export const [
  GET_SALONS_NEW_REQUEST,
  GET_SALONS_NEW_SUCCESS,
  GET_SALONS_NEW_FAIL,
] = createActionType(GET_SALONS_NEW);

export const [
  GET_TOP_CITIES_REQUEST,
  GET_TOP_CITIES_SUCCESS,
  GET_TOP_CITIES_FAIL,
] = createActionType(GET_TOP_CITIES);

export const [
  GET_SEARCH_HISTORY_REQUEST,
  GET_SEARCH_HISTORY_SUCCESS,
  GET_SEARCH_HISTORY_FAIL,
] = createActionType(GET_SEARCH_HISTORY);
