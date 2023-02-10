import { takeLatest, call, put } from 'redux-saga/effects';
import { walletService } from 'services';
import {
  getTransactionsSuccess,
  getTransactionsFail,
  getWalletSuccess,
  getWalletFail,
} from './actions';
import { GET_TRANSACTIONS_REQUEST, GET_WALLET_REQUEST } from './constants';

export function* getTransactions({ payload = {} }) {
  try {
    const { page } = payload;
    const response = yield call([walletService, 'getTransactions'], page);
    yield put(getTransactionsSuccess(response));
  } catch (err) {
    yield put(getTransactionsFail(err));
  }
}

export function* getWallet({ payload }) {
  try {
    const response = yield call([walletService, 'getCurrentWallet'], payload);
    yield put(getWalletSuccess(response));
  } catch (err) {
    yield put(getWalletFail(err));
  }
}

export default function* walletPageSaga() {
  yield takeLatest(GET_TRANSACTIONS_REQUEST, getTransactions);
  yield takeLatest(GET_WALLET_REQUEST, getWallet);
}
