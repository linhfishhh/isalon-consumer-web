import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the launcherApp state domain
 */

const selectLauncherAppDomain = state => state.launcherApp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LauncherApp
 */

const makeSelectLauncherApp = () =>
  createSelector(
    selectLauncherAppDomain,
    substate => substate,
  );

export default makeSelectLauncherApp;
export { selectLauncherAppDomain };
