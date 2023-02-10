import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectRequireEnterInfoDomain = state => state[CONTEXT] || initialState;

const makeSelectUpdateSuccess = () =>
  createSelector(
    selectRequireEnterInfoDomain,
    substate => substate.updateSuccess,
  );

const makeSelectMessage = () =>
  createSelector(
    selectRequireEnterInfoDomain,
    substate => substate.message,
  );

export { makeSelectUpdateSuccess, makeSelectMessage };
