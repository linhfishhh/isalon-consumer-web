import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the ChangePhone state domain
 */

const selectChangePhone = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePhone
 */

const makeSelectChanePhoneError = () =>
  createSelector(
    selectChangePhone,
    substate => substate.error,
  );

export { makeSelectChanePhoneError };
