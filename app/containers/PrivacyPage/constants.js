/*
 *
 * BecomeSalonManager constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/TOS';
export const GET_PRIVACY = `${CONTEXT}/GET_PRIVACY`;

export const [
  GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS,
  GET_PRIVACY_FAIL,
] = createActionType(GET_PRIVACY);
