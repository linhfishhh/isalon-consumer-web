import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state[CONTEXT] || initialState;

const makeSelectOpenCartNotification = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate.openCartNotification,
  );

export { makeSelectOpenCartNotification };
