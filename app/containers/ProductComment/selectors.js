import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the productComment state domain
 */

const selectProductCommentDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductComment
 */

const makeSelectProductComment = () =>
  createSelector(
    selectProductCommentDomain,
    substate => substate,
  );

const makeSelectProductReviews = () =>
  createSelector(
    selectProductCommentDomain,
    substate => substate.reviews,
  );

export { makeSelectProductComment, makeSelectProductReviews };
