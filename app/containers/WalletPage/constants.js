/*
 *
 * WalletPage constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/WALLET';

export const GET_TRANSACTIONS = `${CONTEXT}/GET_TRANSACTIONS`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const GET_WALLET = `${CONTEXT}/GET_WALLET`;
export const NEED_UPDATE_WALLET = `${CONTEXT}/NEED_UPDATE_WALLET`;
export const WALLET_INVITED = `${CONTEXT}/WALLET_INVITED`;

export const [
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
] = createActionType(GET_TRANSACTIONS);

export const [
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAIL,
] = createActionType(GET_WALLET);
