import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectHistoryDomain = state => state[CONTEXT] || initialState;

const makeSelectBookingLoading = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate.loadingBooking,
  );

const makeSelectWaitingBooking = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate.bookingWaiting,
  );

const makeSelectShoppingLoading = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate.loadingShopping,
  );

const makeSelectWaitingShopping = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate.shoppingWaiting,
  );

const makeSelectTypeActive = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate.typeActive,
  );

export {
  makeSelectWaitingBooking,
  makeSelectWaitingShopping,
  makeSelectBookingLoading,
  makeSelectShoppingLoading,
  makeSelectTypeActive,
};
