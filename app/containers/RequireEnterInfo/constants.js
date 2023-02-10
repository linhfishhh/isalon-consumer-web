/*
 *
 * RequireEnterInfo constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/REQUIRE_ENTER_INFO';

export const UPDATE_EMAIL = `${CONTEXT}/UPDATE_EMAIL`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;

export const LOADING_ACTIONS = [UPDATE_EMAIL];

export const [
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAIL,
] = createActionType(UPDATE_EMAIL);
