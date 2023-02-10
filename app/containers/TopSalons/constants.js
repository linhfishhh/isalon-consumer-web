/*
 *
 * TopSalons constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/TOP_SALONS';

export const GET_SALONS_NEAR_ME = `${CONTEXT}/GET_SALONS_NEAR_ME`;
export const GET_TOP_SALONS = `${CONTEXT}/GET_TOP_SALONS`;
export const UPDATE_LATEST_LOCATION = `${CONTEXT}/UPDATE_LATEST_LOCATION`;

export const TOP_SALONS_NEAR_ME = 'near_me';
export const TOP_SALONS_TOP_TEN = 'top_ten';

export const [
  GET_SALONS_NEAR_ME_REQUEST,
  GET_SALONS_NEAR_ME_SUCCESS,
  GET_SALONS_NEAR_ME_FAIL,
] = createActionType(GET_SALONS_NEAR_ME);

export const [
  GET_TOP_SALONS_REQUEST,
  GET_TOP_SALONS_SUCCESS,
  GET_TOP_SALONS_FAIL,
] = createActionType(GET_TOP_SALONS);
