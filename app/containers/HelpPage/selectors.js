import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the becomeSalonManager state domain
 */

const selectHelpDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BecomeSalonManager
 */

const makeSelectHelp = () =>
  createSelector(
    selectHelpDomain,
    substate => substate.help,
  );

export { makeSelectHelp };
