import { takeLatest, call, put } from 'redux-saga/effects';
import { authLegacyService, legacyProfileService } from 'services';
import { updatePhoneSuccess } from 'containers/Personal/actions';
import {
  getVerificationCodeSuccess,
  getVerificationCodeFail,
  verifyCodeSuccess,
  verifyCodeFail,
} from './actions';
import {
  GET_VERIFICATION_CODE_REQUEST,
  VERIFY_CODE_REQUEST,
} from './constants';

export function* getVerificationCode({ payload }) {
  try {
    const { phone, success } = payload;
    const response = yield call([authLegacyService, 'verifyPhone'], { phone });
    yield put(getVerificationCodeSuccess(response));
    if (success) {
      success();
    }
  } catch (err) {
    yield put(getVerificationCodeFail(err.response));
  }
}

export function* updatePhone({ payload }) {
  try {
    const { phone, code, success } = payload;
    const response = yield call([legacyProfileService, 'updatePhone'], {
      phone,
      code,
    });
    yield put(verifyCodeSuccess(response));
    yield put(updatePhoneSuccess({ phone }));
    if (success) {
      success();
    }
  } catch (err) {
    yield put(verifyCodeFail(err.response));
  }
}

// Individual exports for testing
export default function* changePhoneSaga() {
  yield takeLatest(GET_VERIFICATION_CODE_REQUEST, getVerificationCode);
  yield takeLatest(VERIFY_CODE_REQUEST, updatePhone);
}
