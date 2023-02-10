import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the productSearch state domain
 */

const selectProductSearchDomain = state => state[CONTEXT] || initialState;

const makeSelectFetched = () =>
  createSelector(
    selectProductSearchDomain,
    substate => substate.fetched,
  );

const makeSelectSearchHistories = () =>
  createSelector(
    selectProductSearchDomain,
    substate => substate.searchHistories,
  );

const makeSelectHotKeywords = () =>
  createSelector(
    selectProductSearchDomain,
    substate => substate.hotKeywords,
  );

const makeSelectSuggestionKeywords = () =>
  createSelector(
    selectProductSearchDomain,
    substate => substate.suggestionKeywords,
  );

export {
  makeSelectFetched,
  makeSelectSearchHistories,
  makeSelectHotKeywords,
  makeSelectSuggestionKeywords,
};
