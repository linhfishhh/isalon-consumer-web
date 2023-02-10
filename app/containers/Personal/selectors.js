import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the header state domain
 */

const selectPeronsalDomain = state => state[CONTEXT] || initialState;

const makeSelectProfile = () =>
  createSelector(
    selectPeronsalDomain,
    substate => substate.profile,
  );

const makeSelectBookingHistory = () =>
  createSelector(
    selectPeronsalDomain,
    substate => substate.bookingHistories,
  );

const makeSelectShowBookingDetail = () =>
  createSelector(
    selectPeronsalDomain,
    substate => substate.showDetail,
  );

const makeSelectUpdateProfileErrors = () =>
  createSelector(
    selectPeronsalDomain,
    substate => substate.errors,
  );

const makeSelectFavoriteProductCount = () =>
  createSelector(
    selectPeronsalDomain,
    substate => substate.favoriteProductCount,
  );

export {
  selectPeronsalDomain,
  makeSelectProfile,
  makeSelectBookingHistory,
  makeSelectShowBookingDetail,
  makeSelectUpdateProfileErrors,
  makeSelectFavoriteProductCount,
};
