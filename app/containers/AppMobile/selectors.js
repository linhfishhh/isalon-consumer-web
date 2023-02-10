import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appMobile state domain
 */

const selectAppMobileDomain = state => state.appMobile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppMobile
 */

const makeSelectAppMobile = () =>
  createSelector(
    selectAppMobileDomain,
    substate => substate,
  );

export default makeSelectAppMobile;
export { selectAppMobileDomain };
