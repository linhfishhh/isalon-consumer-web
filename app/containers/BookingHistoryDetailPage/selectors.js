import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the bookingHistoryDetailPage state domain
 */

const selectBookingHistoryDetailPageDomain = state =>
  state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingHistoryDetailPage
 */

const makeSelectBookingHistoryDetailPage = () =>
  createSelector(
    selectBookingHistoryDetailPageDomain,
    substate => substate.detail,
  );

export { makeSelectBookingHistoryDetailPage };
