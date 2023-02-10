/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectHome = state => state[CONTEXT] || initialState;

const makeSelectFetched = () =>
  createSelector(
    selectHome,
    state => state.fetched,
  );

const makeSelectBanners = () =>
  createSelector(
    selectHome,
    state => state.banners,
  );

const makeSelectLatestPosts = () =>
  createSelector(
    selectHome,
    state => state.latestBlogs,
  );

const makeSelectTopDeals = () =>
  createSelector(
    selectHome,
    state => state.topDeals,
  );

const makeSelectTopBrands = () =>
  createSelector(
    selectHome,
    state => state.topBrands,
  );

const makeSelectSearchHistories = () =>
  createSelector(
    selectHome,
    homeState => homeState.searchHistories,
  );

export {
  makeSelectFetched,
  makeSelectBanners,
  makeSelectLatestPosts,
  makeSelectTopDeals,
  makeSelectTopBrands,
  makeSelectSearchHistories,
};
