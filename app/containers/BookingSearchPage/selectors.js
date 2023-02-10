import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectBookingSearchDomain = state => state[CONTEXT] || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectBookingSearchDomain,
    substate => substate.loading,
  );

const makeSelectBookingSearchResult = () =>
  createSelector(
    selectBookingSearchDomain,
    substate => substate.searchResult,
  );

const makeSelectBookingProvince = () =>
  createSelector(
    selectBookingSearchDomain,
    substate => substate.province,
  );

const makeSelectBookingDistricts = () =>
  createSelector(
    selectBookingSearchDomain,
    substate => substate.districts,
  );

export {
  makeSelectLoading,
  makeSelectBookingSearchResult,
  makeSelectBookingProvince,
  makeSelectBookingDistricts,
};
