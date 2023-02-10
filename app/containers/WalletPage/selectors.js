import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectWalletPageDomain = state => state[CONTEXT] || initialState;

const makeSelectTransactions = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.transactions,
  );

const makeSelectWallet = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.wallet,
  );

const makeSelectNeedUpdate = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.needUpdate,
  );

export { makeSelectTransactions, makeSelectWallet, makeSelectNeedUpdate };
