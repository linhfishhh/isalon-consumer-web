import { takeLatest, call, put, select } from 'redux-saga/effects';
import { shopService } from 'services';
import { get } from 'lodash';
import {
  getCartSuccess,
  getCartFail,
  addProductItemSuccess,
  addProductItemFail,
  removeProductItemSuccess,
  removeProductItemFail,
  removeCartItemSuccess,
  removeCartItemFail,
  selectAllCartItemsFail,
  selectAllCartItemsSuccess,
  selectCartItemFail,
  selectCartItemSuccess,
  getCartQuantitySuccess,
  getCartQuantityFail,
  likeProductSuccess,
  likeProductFail,
  unlikeProductSuccess,
  unlikeProductFail,
  showError,
  calculateCartFail,
  calculateCartSuccess,
} from './actions';
import {
  GET_CART_REQUEST,
  ADD_PRODUCT_ITEM_REQUEST,
  REMOVE_PRODUCT_ITEM_REQUEST,
  REMOVE_CART_ITEM_REQUEST,
  SELECT_CART_ITEM_REQUEST,
  SELECT_ALL_CART_ITEMS_REQUEST,
  GET_CART_QUANTITY_REQUEST,
  LIKE_PRODUCT_REQUEST,
  UNLIKE_PRODUCT_REQUEST,
  CALCULATE_CART_REQUEST,
} from './constants';
import {
  makeSelectCart,
  makeSelectAddress,
  makeSelectGiftCode,
  makeSelectSelectedItems,
} from './selectors';

function* getCart() {
  try {
    const response = yield call([shopService, 'getCart']);
    const cart = get(response, 'data', []);
    yield put(getCartSuccess(cart));
  } catch (err) {
    yield put(getCartFail(err));
  }
}

function* addProductItem({ payload }) {
  try {
    const response = yield call([shopService, 'addProductsToCart'], payload);
    const cart = get(response, 'data', []);

    yield put(addProductItemSuccess(cart));
  } catch (err) {
    yield put(addProductItemFail(err));
  }
}

function* removeProductItem({ payload }) {
  try {
    const request = {
      productId: get(payload, 'product.productId'),
      productVariantId: get(payload, 'productVariant.productVariantId'),
      quantity: 1,
    };
    const response = yield call(
      [shopService, 'removeProductFromCart'],
      request,
    );
    const cart = get(response, 'data', []);
    yield put(removeProductItemSuccess(cart));
  } catch (err) {
    yield put(removeProductItemFail(err));
  }
}

function* removeCartItem({ payload }) {
  const cartItemId = get(payload, 'cartItemId');
  const ids = [cartItemId];
  try {
    const response = yield call([shopService, 'removeCartItems'], ids);
    yield put(removeCartItemSuccess(response.data));
  } catch (err) {
    yield put(removeCartItemFail(err));
  }
}

function* selectCartItem({ payload }) {
  const { item, checked = true } = payload;
  const request = { cartItemId: item.cartItemId, isSelected: checked };
  try {
    const response = yield call([shopService, 'updateCartItem'], request);
    yield put(selectCartItemSuccess(response.data));
  } catch (err) {
    yield put(selectCartItemFail(err));
  }
}

export function* selectAllCartItems({ payload }) {
  const { checked = true } = payload;
  const request = { isSelected: checked };
  try {
    const response = yield call([shopService, 'selectAllCartItems'], request);
    yield put(selectAllCartItemsSuccess(response.data));
  } catch (err) {
    yield put(selectAllCartItemsFail(err));
  }
}

function* calculateCart(action) {
  const cart = yield select(makeSelectCart());
  const items = cart.items.filter(item => item.isSelected);
  if (items.length <= 0) {
    yield put(showError({ message: 'Vui lòng chọn sản phẩm để đặt hàng' }));
    return;
  }
  const address = yield select(makeSelectAddress());
  const giftCode = get(
    action,
    'payload.giftCode',
    yield select(makeSelectGiftCode()),
  );
  const isConfirm = get(action, 'payload.isConfirm', false);
  try {
    const response = yield call(
      [shopService, 'calculateCart'],
      giftCode,
      address,
    );
    const { data } = response;
    if (isConfirm && data.errors.length === 0) {
      const selectedItems = yield select(makeSelectSelectedItems());
      const cartItemIds = selectedItems.map(item => item.cartItemId);
      const successCallback = get(action, 'payload.success');
      if (successCallback) {
        successCallback({ cartItemIds, giftCode, address });
      }
    } else {
      yield put(calculateCartSuccess(data));
    }
  } catch (err) {
    yield put(calculateCartFail({ error: err }));
  }
}

function* getCartQuantity() {
  try {
    const response = yield call([shopService, 'getCartQuantity']);
    const quantity = get(response, 'data.quantity', 0);
    yield put(getCartQuantitySuccess({ quantity }));
  } catch (err) {
    yield put(getCartQuantityFail(err));
  }
}

export function* likeProduct({ payload }) {
  try {
    const { productId } = payload;
    const response = yield call([shopService, 'likeProduct'], productId);
    yield put(likeProductSuccess(get(response, 'data')));
  } catch (err) {
    yield put(likeProductFail(err));
  }
}

export function* unlikeProduct({ payload }) {
  try {
    const { productId } = payload;
    const response = yield call([shopService, 'unlikeProduct'], productId);
    yield put(unlikeProductSuccess(get(response, 'data')));
  } catch (err) {
    yield put(unlikeProductFail(err));
  }
}

export default function* headerSaga() {
  yield takeLatest(GET_CART_REQUEST, getCart);
  yield takeLatest(ADD_PRODUCT_ITEM_REQUEST, addProductItem);
  yield takeLatest(REMOVE_PRODUCT_ITEM_REQUEST, removeProductItem);
  yield takeLatest(REMOVE_CART_ITEM_REQUEST, removeCartItem);
  yield takeLatest(SELECT_ALL_CART_ITEMS_REQUEST, selectAllCartItems);
  yield takeLatest(SELECT_CART_ITEM_REQUEST, selectCartItem);
  yield takeLatest(GET_CART_QUANTITY_REQUEST, getCartQuantity);
  yield takeLatest(LIKE_PRODUCT_REQUEST, likeProduct);
  yield takeLatest(UNLIKE_PRODUCT_REQUEST, unlikeProduct);
  yield takeLatest(CALCULATE_CART_REQUEST, calculateCart);
}
