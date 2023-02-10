import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the productSearchResult state domain
 */

const selectProductSearchResultDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductSearchResult
 */

const makeSelectFilterOptions = () =>
  createSelector(
    selectProductSearchResultDomain,
    substate => substate.filterOptions,
  );

const makeSelectSearchResult = () =>
  createSelector(
    selectProductSearchResultDomain,
    substate => substate.searchResult,
  );

export { makeSelectFilterOptions, makeSelectSearchResult };
