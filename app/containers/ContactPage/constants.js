/*
 *
 * BecomeSalonManager constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/CONTACT_US';
export const GET_CONTACT_PAGE_CFG = `${CONTEXT}/GET_CONTACT_PAGE_CFG`;
export const SEND_CONTACT = `${CONTEXT}/SEND_CONTACT`;

export const [
  GET_CONTACT_PAGE_CFG_REQUEST,
  GET_CONTACT_PAGE_CFG_SUCCESS,
  GET_CONTACT_PAGE_CFG_FAIL,
] = createActionType(GET_CONTACT_PAGE_CFG);

export const [
  SEND_CONTACT_REQUEST,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAIL,
] = createActionType(SEND_CONTACT);
