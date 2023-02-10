/*
 *
 * WalletPage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_TRANSACTIONS,
  CLEAN_DATA,
  GET_WALLET,
  NEED_UPDATE_WALLET,
  WALLET_INVITED,
} from './constants';

export const [
  getTransactionsRequest,
  getTransactionsSuccess,
  getTransactionsFail,
] = createSideEffectAction(GET_TRANSACTIONS);

export const [
  getWalletRequest,
  getWalletSuccess,
  getWalletFail,
] = createSideEffectAction(GET_WALLET);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const walletInvitedAction = createSingleAction(WALLET_INVITED);
export const needUpdateWalletAction = createSingleAction(NEED_UPDATE_WALLET);
