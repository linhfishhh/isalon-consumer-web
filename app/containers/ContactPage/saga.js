import { takeLatest, call, put } from 'redux-saga/effects';
import { legacyProfileService } from 'services';
import {
  getContactPageCfgSuccess,
  getContactPageCfgFail,
  sendContactSuccess,
  sendContactFail,
} from './actions';
import {
  GET_CONTACT_PAGE_CFG_REQUEST,
  SEND_CONTACT_REQUEST,
} from './constants';

export function* getContactPageCfg() {
  try {
    const response = yield call([legacyProfileService, 'getContactPageCfg']);
    yield put(getContactPageCfgSuccess(response));
  } catch (err) {
    yield put(getContactPageCfgFail(err));
  }
}

export function* sendContact({ payload }) {
  const { success, fail, ...rest } = payload;
  try {
    const response = yield call([legacyProfileService, 'sendContact'], rest);
    yield put(sendContactSuccess(response));
    if (success) {
      success();
    }
  } catch (err) {
    yield put(sendContactFail(err));
    if (fail) {
      fail();
    }
  }
}

export default function* saga() {
  yield takeLatest(GET_CONTACT_PAGE_CFG_REQUEST, getContactPageCfg);
  yield takeLatest(SEND_CONTACT_REQUEST, sendContact);
}
