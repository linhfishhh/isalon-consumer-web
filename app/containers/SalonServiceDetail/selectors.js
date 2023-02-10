import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectSalonServiceDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectSalonServiceDetail = () =>
  createSelector(
    selectSalonServiceDetailDomain,
    substate => substate.serviceDetail,
  );

export { makeSelectSalonServiceDetail };
