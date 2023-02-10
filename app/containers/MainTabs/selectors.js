import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainTabs state domain
 */

const selectMainTabsDomain = state => state.mainTabs || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainTabs
 */

const makeSelectMainTabs = () =>
  createSelector(
    selectMainTabsDomain,
    substate => substate,
  );

export default makeSelectMainTabs;
export { selectMainTabsDomain };
