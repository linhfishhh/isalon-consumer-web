/*
 *
 * AffiliatePage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  SHOW_DIALOG,
  AFFILIATE_SUCCESS,
  GET_AFFILIATE_INFO_SUCCESS,
  GET_AFFILIATE_INFO_FAIL,
  GET_AFFILIATE_SETTING_SUCCESS,
  GET_AFFILIATE_SETTING_FAIL,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  showDialog: false,
  affiliateSuccess: false,
  affiliateInfo: {},
  affiliateSettings: {},
  error: {},
};

const affiliatePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SHOW_DIALOG: {
        cloneDraft.showDialog = get(action, 'payload', false);
        break;
      }
      case AFFILIATE_SUCCESS: {
        cloneDraft.showDialog = true;
        cloneDraft.affiliateSuccess = true;
        break;
      }
      case GET_AFFILIATE_INFO_SUCCESS: {
        cloneDraft.affiliateInfo = get(action, 'payload.data', {});
        break;
      }
      case GET_AFFILIATE_SETTING_SUCCESS: {
        cloneDraft.affiliateSettings = get(action, 'payload.data', {});
        break;
      }
      case GET_AFFILIATE_SETTING_FAIL:
      case GET_AFFILIATE_INFO_FAIL: {
        cloneDraft.error = get(action, 'payload', {});
        break;
      }
      case CLEAN_DATA: {
        cloneDraft.showDialog = initialState.showDialog;
        cloneDraft.affiliateInfo = initialState.affiliateInfo;
        cloneDraft.error = initialState.error;
        cloneDraft.affiliateSuccess = initialState.affiliateSuccess;
        break;
      }
      default:
        break;
    }
  });

export default affiliatePageReducer;
