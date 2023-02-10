import { takeLatest, call, put } from 'redux-saga/effects';
import { walletService } from 'services';
import {
  getAffiliateInfoSuccess,
  getAffiliateInfoFail,
  getAffiliateSettingsSuccess,
  getAffiliateSettingsFail,
} from './actions';
import {
  GET_AFFILIATE_INFO_REQUEST,
  GET_AFFILIATE_SETTING_REQUEST,
} from './constants';

export function* getAffiliateInfo({ payload }) {
  try {
    const response = yield call([walletService, 'getAffiliateInfo'], payload);
    yield put(getAffiliateInfoSuccess(response));
  } catch (err) {
    yield put(getAffiliateInfoFail(err));
  }
}

export function* getAffiliateSettings() {
  try {
    const response = yield call([walletService, 'getAffiliateSettings']);
    yield put(getAffiliateSettingsSuccess(response));
  } catch (err) {
    yield put(getAffiliateSettingsFail(err));
  }
}

export default function* affiliatePageSaga() {
  yield takeLatest(GET_AFFILIATE_INFO_REQUEST, getAffiliateInfo);
  yield takeLatest(GET_AFFILIATE_SETTING_REQUEST, getAffiliateSettings);
}
