import { takeLatest, call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { legacyProfileService } from 'services';
import { updateLoggedInUser } from 'utils/auth';
import { updateUserInfoAction } from 'containers/Authentication/actions';
import { UPDATE_EMAIL_REQUEST } from './constants';
import { updateEmailSuccess, updateEmailFail } from './actions';

function* updateEmail({ payload }) {
  try {
    const data = new FormData();
    data.append('name', payload.name);
    data.append('email', payload.email);
    const response = yield call([legacyProfileService, 'updateEmail'], data);
    const status = get(response, 'status', false);
    if (status) {
      const newInfo = get(response, 'data.original', {});
      const userInfo = {
        name: newInfo.name,
        email: newInfo.email,
      };
      updateLoggedInUser(userInfo);
      yield put(updateUserInfoAction(userInfo));
      yield put(updateEmailSuccess(response));
    } else {
      const message = get(response, 'message');
      yield put(updateEmailFail(message));
    }
  } catch (err) {
    yield put(updateEmailFail('Đã có lỗi xảy ra, vui lòng thử lại!'));
  }
}

// Individual exports for testing
export default function* requireEnterInfoSaga() {
  yield takeLatest(UPDATE_EMAIL_REQUEST, updateEmail);
}
