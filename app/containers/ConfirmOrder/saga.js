import { takeLatest, call, put, select } from 'redux-saga/effects';
import { shopService, profileService } from 'services';
import { get } from 'lodash';
import { getCartQuantityRequest } from 'containers/Cart/actions';
import { getMyAddressesSuccess } from 'containers/AddressBook/actions';
import { PAY_REQUEST, PRE_PAY_REQUEST } from './constants';
import {
  paySuccess,
  payFail,
  prePaySuccess,
  prePayFail,
  selectAddress,
} from './actions';
import { makeSelectAddress, makeSelectOrder } from './selectors';

function findDefaultAddress(addresses) {
  const findDefault = addresses.find(a => a.isDefault);
  if (!findDefault && addresses.length > 0) {
    if (addresses.length > 0) {
      return addresses[0];
    }
    return {};
  }
  return findDefault;
}

function* prePay({ payload }) {
  const order = yield select(makeSelectOrder());
  const storedAddress = yield select(makeSelectAddress());
  const {
    giftCode = get(order, 'giftCode'),
    address = storedAddress,
    items,
    cartItemIds,
    locationChanged = false,
    spendMaxCoin,
  } = payload;
  const request = {
    giftCode,
    addressId: get(address, 'addressId'),
    items,
    cartItemIds,
    spendMaxCoin,
    paymentType: 'CASH',
    shippingType: 'STANDARD',
  };
  try {
    if (locationChanged) {
      const response = yield call([profileService, 'getMyAddresses']);
      const addresses = response.data;
      const defaultAddr = findDefaultAddress(addresses);
      if (defaultAddr) {
        request.addressId = get(defaultAddr, 'addressId', request.addressId);
        yield put(selectAddress(defaultAddr));
      }
      yield put(getMyAddressesSuccess(response));
    }
    const response = yield call([shopService, 'prePay'], request);
    yield put(prePaySuccess(response.data));
  } catch (err) {
    yield put(prePayFail(err));
  }
}

function* pay({ payload }) {
  const order = yield select(makeSelectOrder());
  const address = yield select(makeSelectAddress());
  const { giftCode } = order;
  const { items, cartItemIds, spendMaxCoin } = payload;
  const request = {
    giftCode,
    addressId: get(address, 'addressId'),
    items,
    cartItemIds,
    spendMaxCoin,
    paymentType: 'CASH',
    shippingType: 'STANDARD',
  };
  try {
    const response = yield call([shopService, 'pay'], request);
    yield put(getCartQuantityRequest());
    yield put(paySuccess(response.data));
  } catch (err) {
    yield put(payFail(err));
  }
}

export default function* confirmOrderSaga() {
  yield takeLatest(PRE_PAY_REQUEST, prePay);
  yield takeLatest(PAY_REQUEST, pay);
}
