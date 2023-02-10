import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the affiliatePage state domain
 */

const selectAffiliatePageDomain = state => state[CONTEXT] || initialState;

const makeSelectShowDialog = () =>
  createSelector(
    selectAffiliatePageDomain,
    substate => substate.showDialog,
  );

const makeSelectAffiliateSuccess = () =>
  createSelector(
    selectAffiliatePageDomain,
    substate => substate.affiliateSuccess,
  );

const makeSelectAffiliateInfo = () =>
  createSelector(
    selectAffiliatePageDomain,
    substate => substate.affiliateInfo,
  );

const makeSelectAffiliateSettings = () =>
  createSelector(
    selectAffiliatePageDomain,
    substate => substate.affiliateSettings,
  );

export {
  makeSelectShowDialog,
  makeSelectAffiliateSuccess,
  makeSelectAffiliateInfo,
  makeSelectAffiliateSettings,
};
