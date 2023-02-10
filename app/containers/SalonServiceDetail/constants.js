/*
 *
 * SalonServiceDetail constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/SERVICE_DETAIL';

export const GET = `${CONTEXT}/GET`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
