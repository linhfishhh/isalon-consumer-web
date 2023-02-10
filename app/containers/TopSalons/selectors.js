/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectTopSalons = state => state[CONTEXT] || initialState;

const makeSelectSalonsNearMe = () =>
  createSelector(
    selectTopSalons,
    homeState => homeState.salonsNearMe,
  );

const makeSelectTopSalons = () =>
  createSelector(
    selectTopSalons,
    state => state.topSalons,
  );

const makeSelectLatestLocation = () =>
  createSelector(
    selectTopSalons,
    state => state.latestLocation,
  );

export {
  makeSelectSalonsNearMe,
  makeSelectTopSalons,
  makeSelectLatestLocation,
};
