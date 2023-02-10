import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the becomeSalonManager state domain
 */

const selectContactPageDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BecomeSalonManager
 */

const makeSelectContactPageCfg = () =>
  createSelector(
    selectContactPageDomain,
    substate => substate.contactCfg,
  );

export { makeSelectContactPageCfg };
