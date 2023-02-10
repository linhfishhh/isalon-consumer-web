/*
 *
 * BecomeSalonManager constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/HELP';
export const GET_HELP = `${CONTEXT}/GET_HELP`;

export const [
  GET_HELP_REQUEST,
  GET_HELP_SUCCESS,
  GET_HELP_FAIL,
] = createActionType(GET_HELP);
