import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
/**
 * Direct selector to the promotion state domain
 */

const selectPromotionDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Promotion
 */

const makeSelectPromotion = () =>
  createSelector(
    selectPromotionDomain,
    substate => substate.promotion,
  );

const makeSelectBanners = () =>
  createSelector(
    selectPromotionDomain,
    substate => substate.banners,
  );

export { makeSelectPromotion, makeSelectBanners };
