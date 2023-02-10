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

const makeSelectSalonsNew = () =>
  createSelector(
    selectHome,
    homeState => homeState.salonsNew,
  );

const makeSelectTopCities = () =>
  createSelector(
    selectHome,
    homeState => homeState.topCities,
  );

const makeSelectSearchHistories = () =>
  createSelector(
    selectHome,
    homeState => homeState.searchHistories,
  );

export {
  selectHome,
  makeSelectFetched,
  makeSelectBanners,
  makeSelectSalonsNew,
  makeSelectTopCities,
  makeSelectSearchHistories,
};
