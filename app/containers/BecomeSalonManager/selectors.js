import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the becomeSalonManager state domain
 */

const selectBecomeSalonManagerDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BecomeSalonManager
 */

const makeSelectBecomeSalonManagerCfg = () =>
  createSelector(
    selectBecomeSalonManagerDomain,
    substate => substate.mngConfig,
  );

export { makeSelectBecomeSalonManagerCfg };
