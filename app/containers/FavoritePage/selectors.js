import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the favoritePage state domain
 */

const selectFavoritePageDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FavoritePage
 */

const makeSelectFavoritedSalons = () =>
  createSelector(
    selectFavoritePageDomain,
    substate => substate.salons,
  );

const makeSelectFavoritedShowcases = () =>
  createSelector(
    selectFavoritePageDomain,
    substate => substate.showcases,
  );

const makeSelectFavoritedProducts = () =>
  createSelector(
    selectFavoritePageDomain,
    substate => substate.products,
  );

export {
  makeSelectFavoritedSalons,
  makeSelectFavoritedShowcases,
  makeSelectFavoritedProducts,
};
