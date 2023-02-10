import { takeLatest, call, put } from 'redux-saga/effects';
import { legacyProfileService, shopService } from 'services';
import {
  getFavoritedSalonsSuccess,
  getFavoritedSalonsFail,
  removeFavoritedSalonFail,
  removeFavoritedSalonSuccess,
  removeFavoritedShowcaseSuccess,
  removeFavoritedShowcaseFail,
  getFavoritedProductsSuccess,
  getFavoritedProductsFail,
  removeFavoritedProductSuccess,
  removeFavoritedProductFail,
} from './actions';
import {
  GET_FAVORITED_SALONS_REQUEST,
  REMOVE_FAVORITED_SALON_REQUEST,
  REMOVE_FAVORITED_SHOWCASE_REQUEST,
  GET_FAVORITED_PRODUCTS_REQUEST,
  REMOVE_FAVORITED_PRODUCT_REQUEST,
} from './constants';

export function* getFavoritedSalons() {
  try {
    const response = yield call([legacyProfileService, 'getFavoritedSalons']);
    yield put(getFavoritedSalonsSuccess(response));
  } catch (err) {
    yield put(getFavoritedSalonsFail(err));
  }
}

export function* removeFavoritedSalon({ payload }) {
  try {
    const { id } = payload;
    yield call([legacyProfileService, 'removeFavoritedSalon'], payload);
    yield put(removeFavoritedSalonSuccess({ id }));
  } catch (err) {
    yield put(removeFavoritedSalonFail(err));
  }
}

export function* removeFavoritedShowcase({ payload }) {
  try {
    const { id } = payload;
    yield call([legacyProfileService, 'removeFavoritedShowcase'], payload);
    yield put(removeFavoritedShowcaseSuccess({ id }));
  } catch (err) {
    yield put(removeFavoritedShowcaseFail(err));
  }
}

export function* getFavoritedProducts({ payload }) {
  try {
    const response = yield call([shopService, 'getFavoritedProducts'], payload);
    yield put(getFavoritedProductsSuccess(response));
  } catch (err) {
    yield put(getFavoritedProductsFail(err));
  }
}

export function* removeFavoritedProduct({ payload }) {
  try {
    const { productId } = payload;
    yield call([shopService, 'removeFavoritedProduct'], productId);
    yield put(removeFavoritedProductSuccess({ productId }));
  } catch (err) {
    yield put(removeFavoritedProductFail(err));
  }
}

export default function* favoriteSaga() {
  yield takeLatest(GET_FAVORITED_SALONS_REQUEST, getFavoritedSalons);
  yield takeLatest(REMOVE_FAVORITED_SALON_REQUEST, removeFavoritedSalon);
  yield takeLatest(REMOVE_FAVORITED_SHOWCASE_REQUEST, removeFavoritedShowcase);
  yield takeLatest(GET_FAVORITED_PRODUCTS_REQUEST, getFavoritedProducts);
  yield takeLatest(REMOVE_FAVORITED_PRODUCT_REQUEST, removeFavoritedProduct);
}
