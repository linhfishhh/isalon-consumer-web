import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
const selectSearchDomain = state => state[CONTEXT] || initialState;

const makeSelectSearchConfigs = () =>
  createSelector(
    selectSearchDomain,
    substate => substate.searchConfigs,
  );

const makeSelectProvinces = () =>
  createSelector(
    selectSearchDomain,
    substate => substate.provinces,
  );

const makeSelectSearchHints = () =>
  createSelector(
    selectSearchDomain,
    substate => substate.searchHints,
  );

const makeSelectHintLoadding = () =>
  createSelector(
    selectSearchDomain,
    substate => substate.hintsLoading,
  );

export {
  makeSelectSearchConfigs,
  makeSelectProvinces,
  makeSelectSearchHints,
  makeSelectHintLoadding,
};
