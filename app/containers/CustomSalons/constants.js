/*
 *
 * CustomSalons constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/CUSTOM_SALONS';

export const GET_CUSTOM_SALONS = `${CONTEXT}/GET_CUSTOM_SALONS`;

export const [
  GET_CUSTOM_SALONS_REQUEST,
  GET_CUSTOM_SALONS_SUCCESS,
  GET_CUSTOM_SALONS_FAIL,
] = createActionType(GET_CUSTOM_SALONS);
