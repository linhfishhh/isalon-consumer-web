import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
/**
 * Direct selector to the salonDetail state domain
 */

const selectSalonDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectSalonDetail = () =>
  createSelector(
    selectSalonDetailDomain,
    substate => substate.salonDetail,
  );

const makeSelectBookingSuccess = () =>
  createSelector(
    selectSalonDetailDomain,
    substate => substate.bookingSuccess,
  );

export { makeSelectSalonDetail, makeSelectBookingSuccess };
