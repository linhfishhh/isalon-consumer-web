import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import { getProductListSuccess, getProductListFail } from './actions';
import { GET_PRODUCT_LIST_REQUEST } from './constants';

export function* getProductList() {
  try {
    const response = yield call([shopService, 'getProductBestSelling']);
    yield put(getProductListSuccess(response));
  } catch (err) {
    yield put(getProductListFail(err));
  }
}

export default function* productBestSellingSaga() {
  yield takeLatest(GET_PRODUCT_LIST_REQUEST, getProductList);
}
