import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the becomeSalonManager state domain
 */

const selectPrivacyDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BecomeSalonManager
 */

const makeSelectPrivacy = () =>
  createSelector(
    selectPrivacyDomain,
    substate => substate.tos,
  );

export { makeSelectPrivacy };
