/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectAppDomain = state => state[CONTEXT] || initialState;

const makeSelectApp = () =>
  createSelector(
    selectAppDomain,
    substate => substate,
  );

export default makeSelectApp;
