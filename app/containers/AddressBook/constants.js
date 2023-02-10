/*
 *
 * AddressBook constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/ADDRESS_BOOK';

export const GET_MY_ADDRESSES = `${CONTEXT}/GET_MY_ADDRESSES`;
export const DELETE_MY_ADDRESS = `${CONTEXT}/DELETE_MY_ADDRESS`;

export const [
  GET_MY_ADDRESSES_REQUEST,
  GET_MY_ADDRESSES_SUCCESS,
  GET_MY_ADDRESSES_FAIL,
] = createActionType(GET_MY_ADDRESSES);

export const [
  DELETE_MY_ADDRESS_REQUEST,
  DELETE_MY_ADDRESS_SUCCESS,
  DELETE_MY_ADDRESS_FAIL,
] = createActionType(DELETE_MY_ADDRESS);
