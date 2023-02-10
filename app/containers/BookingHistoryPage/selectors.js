import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the bookingHistoryPage state domain
 */

const selectBookingHistoryPageDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingHistoryPage
 */

const makeSelectBookingHistory = () =>
  createSelector(
    selectBookingHistoryPageDomain,
    substate => substate.bookingHistory,
  );

const makeSelectShowBookingHistoryDetail = () =>
  createSelector(
    selectBookingHistoryPageDomain,
    substate => substate.showHistoryDetail,
  );

const makeSelectShowBookingLoading = () =>
  createSelector(
    selectBookingHistoryPageDomain,
    substate => substate.loading,
  );

export {
  makeSelectBookingHistory,
  makeSelectShowBookingHistoryDetail,
  makeSelectShowBookingLoading,
};
