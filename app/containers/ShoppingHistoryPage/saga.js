import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import get from 'lodash/get';
import { getShoppingHistorySuccess, getShoppingHistoryFail } from './actions';
import { GET_SHOPPING_HISTORY_REQUEST } from './constants';

export function* getShoppingHistories({ payload }) {
  try {
    const response = yield call([shopService, 'getHistories'], payload);
    yield put(getShoppingHistorySuccess(get(response, 'data', {})));
  } catch (err) {
    yield put(getShoppingHistoryFail(err));
  }
}

export default function* shoppingHistorySaga() {
  yield takeLatest(GET_SHOPPING_HISTORY_REQUEST, getShoppingHistories);
}
