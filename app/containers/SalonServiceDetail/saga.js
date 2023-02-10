import { takeLatest, call, put } from 'redux-saga/effects';
import { salonDetailService } from 'services';
import { GET_REQUEST } from './constants';
import { getSuccess, getFail } from './actions';

export function* getServiceDetail({ payload }) {
  try {
    const { serviceId } = payload;
    const response = yield call(
      [salonDetailService, 'getServiceDetail'],
      serviceId,
    );
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export default function* salonServiceDetailSaga() {
  yield takeLatest(GET_REQUEST, getServiceDetail);
}
