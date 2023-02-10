import { takeLatest, call, put } from 'redux-saga/effects';
import { authLegacyService } from 'services';
import { getPrivacySuccess, getPrivacyFail } from './actions';
import { GET_PRIVACY_REQUEST } from './constants';

export function* getPrivacy() {
  try {
    const response = yield call([authLegacyService, 'getPrivacy']);
    yield put(getPrivacySuccess(response));
  } catch (err) {
    yield put(getPrivacyFail(err));
  }
}

export default function* bookingHistorySaga() {
  yield takeLatest(GET_PRIVACY_REQUEST, getPrivacy);
}
