import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the discountCode state domain
 */

const selectDiscountCodeDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiscountCode
 */

const makeSelectDiscountCodes = () =>
  createSelector(
    selectDiscountCodeDomain,
    substate => substate.discountCodes,
  );

export { makeSelectDiscountCodes };
