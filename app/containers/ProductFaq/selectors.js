import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the productFaq state domain
 */

const selectProductFaqDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductFaq
 */

const makeSelectProductFaq = () =>
  createSelector(
    selectProductFaqDomain,
    substate => substate.faqs,
  );

export { makeSelectProductFaq };
