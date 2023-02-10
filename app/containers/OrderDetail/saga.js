import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import get from 'lodash/get';
import { cancelOrderSuccessAction } from 'containers/ShoppingHistoryPage/actions';
import {
  getOrderDetailSuccess,
  getOrderDetailFail,
  cancelOrderSuccess,
  cancelOrderFail,
} from './actions';
import { GET_ORDER_DETAIL_REQUEST, CANCEL_ORDER_REQUEST } from './constants';

export function* getOrderDetail({ payload }) {
  try {
    const { orderId } = payload;
    const response = yield call([shopService, 'getOrderDetail'], orderId);
    yield put(getOrderDetailSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getOrderDetailFail(err));
  }
}

export function* cancelOrder({ payload }) {
  try {
    const response = yield call([shopService, 'cancelOrder'], payload);
    yield put(cancelOrderSuccess(get(response, 'data', {})));
    yield put(cancelOrderSuccessAction(get(response, 'data', {})));
  } catch (err) {
    yield put(cancelOrderFail(err));
  }
}

export default function* saga() {
  yield takeLatest(GET_ORDER_DETAIL_REQUEST, getOrderDetail);
  yield takeLatest(CANCEL_ORDER_REQUEST, cancelOrder);
}
