import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the shoppingHistoryPage state domain
 */

const selectShoppingHistoryPageDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ShoppingHistoryPage
 */

const makeSelectShoppingHistory = () =>
  createSelector(
    selectShoppingHistoryPageDomain,
    substate => substate.shoppingHistory,
  );

const makeSelectShoppingHistoryLoading = () =>
  createSelector(
    selectShoppingHistoryPageDomain,
    substate => substate.loading,
  );

export { makeSelectShoppingHistory, makeSelectShoppingHistoryLoading };
