import { takeLatest, call, put } from 'redux-saga/effects';
import { legacyProfileService } from 'services';
import {
  getBecomeSalonManagerCfgSuccess,
  getBecomeSalonManagerCfgFail,
} from './actions';
import { GET_BECOME_SALON_MANAGER_CFG_REQUEST } from './constants';

export function* getBecomeSalonManagerCfg() {
  try {
    const response = yield call([
      legacyProfileService,
      'getBecomeSalonManagerCfg',
    ]);
    yield put(getBecomeSalonManagerCfgSuccess(response));
  } catch (err) {
    yield put(getBecomeSalonManagerCfgFail(err));
  }
}

export default function* bookingHistorySaga() {
  yield takeLatest(
    GET_BECOME_SALON_MANAGER_CFG_REQUEST,
    getBecomeSalonManagerCfg,
  );
}
