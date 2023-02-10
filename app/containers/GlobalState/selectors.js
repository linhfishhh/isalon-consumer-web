import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectGlobalStateDomain = state => state[CONTEXT] || initialState;

const makeSelectCurrentLocation = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.currentLocation,
  );

const makeSelectProvinceList = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.provinces,
  );

const makeSelectRefreshLocation = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.refreshLocation,
  );

const makeSelectGlobalConfig = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.globalConfig,
  );

const makeSelectStackNumberPage = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.stackNumberPage,
  );

const makeSelectSearchConfig = () =>
  createSelector(
    selectGlobalStateDomain,
    substate => substate.searchConfig,
  );

export {
  makeSelectCurrentLocation,
  makeSelectProvinceList,
  makeSelectRefreshLocation,
  makeSelectGlobalConfig,
  makeSelectStackNumberPage,
  makeSelectSearchConfig,
};
