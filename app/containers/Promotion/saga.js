import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingHomeService } from 'services';
import { getPromotionSuccess, getPromotionFail } from './actions';
import { GET_PROMOTION_REQUEST } from './constants';

export function* getPromotion() {
  try {
    const response = yield call([bookingHomeService, 'getPromotion']);
    yield put(getPromotionSuccess(response));
  } catch (err) {
    yield put(getPromotionFail(err));
  }
}

export default function* promotionSaga() {
  yield takeLatest(GET_PROMOTION_REQUEST, getPromotion);
}
