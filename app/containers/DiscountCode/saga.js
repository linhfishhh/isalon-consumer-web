import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import get from 'lodash/get';
import { getDiscountCodesSuccess, getDiscountCodesFail } from './actions';
import { GET_DISCOUNT_CODES_REQUEST } from './constants';

export function* getDiscountCodes() {
  try {
    const response = yield call([shopService, 'getPublicDiscountCodes']);
    yield put(getDiscountCodesSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getDiscountCodesFail(err));
  }
}

// Individual exports for testing
export default function* productDetailPageSaga() {
  yield takeLatest(GET_DISCOUNT_CODES_REQUEST, getDiscountCodes);
}
