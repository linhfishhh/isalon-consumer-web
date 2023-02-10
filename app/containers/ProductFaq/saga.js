import { takeLatest, call, put } from 'redux-saga/effects';
import { productReviewService } from 'services';
import {
  getFaqSuccess,
  getFaqFail,
  addFaqSuccess,
  addFaqFail,
} from './actions';
import { GET_FAQ_REQUEST, ADD_FAQ_REQUEST } from './constants';

export function* getFaq({ payload }) {
  try {
    const response = yield call([productReviewService, 'getAllFAQ'], payload);
    yield put(getFaqSuccess(response));
  } catch (err) {
    yield put(getFaqFail(err));
  }
}

export function* addFaq({ payload }) {
  const { success, fail, ...rest } = payload;
  try {
    const response = yield call([productReviewService, 'addFAQ'], rest);
    yield put(addFaqSuccess(response));
    if (success) {
      success();
    }
  } catch (err) {
    yield put(addFaqFail(err));
    if (fail) {
      fail();
    }
  }
}

// Individual exports for testing
export default function* productDetailPageSaga() {
  yield takeLatest(GET_FAQ_REQUEST, getFaq);
  yield takeLatest(ADD_FAQ_REQUEST, addFaq);
}
