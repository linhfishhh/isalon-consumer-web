import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectHome = state => state[CONTEXT] || initialState;

const makeSelectCustomSalons = () =>
  createSelector(
    selectHome,
    homeState => homeState.customSalons,
  );

const makeSelectFetched = () =>
  createSelector(
    selectHome,
    homeState => homeState.fetched,
  );

export { selectHome, makeSelectFetched, makeSelectCustomSalons };
