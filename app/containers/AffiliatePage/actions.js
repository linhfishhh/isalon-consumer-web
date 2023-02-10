/*
 *
 * AffiliatePage actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import {
  SHOW_DIALOG,
  AFFILIATE_SUCCESS,
  GET_AFFILIATE_INFO,
  GET_AFFILIATE_SETTING,
  CLEAN_DATA,
} from './constants';

export const showDialogAction = createSingleAction(SHOW_DIALOG);
export const affiliateSuccessAction = createSingleAction(AFFILIATE_SUCCESS);
export const cleanDataAction = createSingleAction(CLEAN_DATA);

export const [
  getAffiliateInfoRequest,
  getAffiliateInfoSuccess,
  getAffiliateInfoFail,
] = createSideEffectAction(GET_AFFILIATE_INFO);

export const [
  getAffiliateSettingsRequest,
  getAffiliateSettingsSuccess,
  getAffiliateSettingsFail,
] = createSideEffectAction(GET_AFFILIATE_SETTING);
