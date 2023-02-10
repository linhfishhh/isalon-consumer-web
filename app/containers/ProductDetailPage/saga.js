import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import get from 'lodash/get';
import { addProductItemSuccess } from 'containers/Cart/actions';
import {
  getProductDetailSuccess,
  getProductDetailFail,
  getProductVariantValuesSuccess,
  getProductVariantValuesFail,
  addProductsToCartSuccess,
  addProductsToCartFail,
  getProductVariantsSuccess,
  getProductVariantsFail,
  getViewedProductsSuccess,
  getViewedProductsFail,
  likeProductSuccess,
  likeProductFail,
  unlikeProductSuccess,
  unlikeProductFail,
} from './actions';
import {
  GET_PRODUCT_DETAIL_REQUEST,
  GET_PRODUCT_VARIANT_VALUES_REQUEST,
  ADD_PRODUCTS_TO_CART_REQUEST,
  GET_PRODUCT_VARIANTS_REQUEST,
  GET_VIEWED_PRODUCTS_REQUEST,
  LIKE_PRODUCT_REQUEST,
  UNLIKE_PRODUCT_REQUEST,
} from './constants';

export function* getProductDetail({ payload }) {
  try {
    const { productId } = payload;
    const response = yield call([shopService, 'getProductDetail'], productId);
    yield put(getProductDetailSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getProductDetailFail(err));
  }
}

export function* getProductVariantValues({ payload }) {
  try {
    const { productId } = payload;
    const response = yield call(
      [shopService, 'getProductVariantValues'],
      productId,
    );
    yield put(getProductVariantValuesSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getProductVariantValuesFail(err));
  }
}

export function* getProductVariants({ payload }) {
  try {
    const response = yield call([shopService, 'getProductVariants'], payload);
    yield put(getProductVariantsSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getProductVariantsFail(err));
  }
}

export function* addProductsToCart({ payload }) {
  try {
    const { cartItems, callback } = payload;
    const response = yield call([shopService, 'addProductsToCart'], cartItems);
    const cart = get(response, 'data', []);
    yield put(addProductsToCartSuccess(cart));
    yield put(addProductItemSuccess(cart));
    if (callback) {
      callback();
    }
  } catch (err) {
    yield put(addProductsToCartFail(err));
  }
}

export function* getViewedProducts() {
  try {
    const response = yield call([shopService, 'getViewedProducts']);
    yield put(getViewedProductsSuccess(get(response, 'data')));
  } catch (err) {
    yield put(getViewedProductsFail(err));
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

// Individual exports for testing
export default function* productDetailPageSaga() {
  yield takeLatest(GET_PRODUCT_DETAIL_REQUEST, getProductDetail);
  yield takeLatest(GET_PRODUCT_VARIANT_VALUES_REQUEST, getProductVariantValues);
  yield takeLatest(ADD_PRODUCTS_TO_CART_REQUEST, addProductsToCart);
  yield takeLatest(GET_PRODUCT_VARIANTS_REQUEST, getProductVariants);
  yield takeLatest(GET_VIEWED_PRODUCTS_REQUEST, getViewedProducts);
  yield takeLatest(LIKE_PRODUCT_REQUEST, likeProduct);
  yield takeLatest(UNLIKE_PRODUCT_REQUEST, unlikeProduct);
}
