import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectBookingReviewDomain = state => state[CONTEXT] || initialState;

const makeSelectReviews = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.reviews,
  );

const makeSelectServiceToReview = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.serviceToReview,
  );

const makeSelectCrit = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.crit,
  );

const makeSelectBadges = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.badges,
  );

const makeSelectReviewSuccess = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.reviewSuccess,
  );

const makeSelectShowForm = () =>
  createSelector(
    selectBookingReviewDomain,
    substate => substate.showForm,
  );

export {
  makeSelectReviews,
  makeSelectServiceToReview,
  makeSelectCrit,
  makeSelectBadges,
  makeSelectReviewSuccess,
  makeSelectShowForm,
};
