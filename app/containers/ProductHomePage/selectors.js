import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductHomePageDomain = state => state[CONTEXT] || initialState;

const makeSelectFetched = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.fetched,
  );
const makeSelectProducts = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.products,
  );
const makeSelectSuggestedProducts = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.suggestedProducts,
  );
const makeSelectSpotlights = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.spotlights,
  );
const makeSelectNewProducts = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.newProducts,
  );
const makeSelectFlashSale = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.flashSale,
  );
const makeSelectFeaturedBrands = () =>
  createSelector(
    selectProductHomePageDomain,
    state => state.featuredBrands,
  );

export {
  makeSelectFetched,
  makeSelectProducts,
  makeSelectSuggestedProducts,
  makeSelectSpotlights,
  makeSelectNewProducts,
  makeSelectFlashSale,
  makeSelectFeaturedBrands,
};
