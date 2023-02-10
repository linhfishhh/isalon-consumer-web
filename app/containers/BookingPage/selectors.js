import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the bookingPage state domain
 */

const selectBookingPageDomain = state => state[CONTEXT] || initialState;

const makeSelectBookingItems = () =>
  createSelector(
    selectBookingPageDomain,
    substate => substate.bookingItems,
  );

const makeSelectSalonInfo = () =>
  createSelector(
    selectBookingPageDomain,
    substate => substate.salonInfo,
  );

const makeSelectSalonOpenTime = () =>
  createSelector(
    selectBookingPageDomain,
    substate => substate.salonOpenTime,
  );

const makeSelectBookingCoin = () =>
  createSelector(
    selectBookingPageDomain,
    substate => substate.bookingCoin,
  );

export {
  makeSelectBookingItems,
  makeSelectSalonInfo,
  makeSelectSalonOpenTime,
  makeSelectBookingCoin,
};
