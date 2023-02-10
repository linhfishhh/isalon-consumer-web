/*
 *
 * BecomeSalonManager constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/SALON_MANAGER';
export const GET_BECOME_SALON_MANAGER_CFG = `${CONTEXT}/GET_BECOME_SALON_MANAGER_CFG`;

export const [
  GET_BECOME_SALON_MANAGER_CFG_REQUEST,
  GET_BECOME_SALON_MANAGER_CFG_SUCCESS,
  GET_BECOME_SALON_MANAGER_CFG_FAIL,
] = createActionType(GET_BECOME_SALON_MANAGER_CFG);
