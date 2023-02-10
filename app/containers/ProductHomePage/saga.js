import { takeLatest, call, put } from 'redux-saga/effects';
import { shopService } from 'services';
import {
  getAllProductSuccess,
  getAllProductFail,
  getSuggestedProductSuccess,
  getSuggestedProductFail,
  getSpotlightsSuccess,
  getSpotlightsFail,
  getNewProductsFail,
  getNewProductsSuccess,
  getFlashSaleSuccess,
  getFlashSaleFail,
  getFeaturedBrandsSuccess,
  getFeaturedBrandsFail,
} from './actions';
import {
  GET_ALL_PRODUCT_REQUEST,
  GET_SUGGESTED_PRODUCT_REQUEST,
  GET_SPOTLIGHTS_REQUEST,
  GET_NEW_PRODUCTS_REQUEST,
  GET_FLASH_SALE_REQUEST,
  GET_FEATURED_BRANDS_REQUEST,
} from './constants';

export function* getAllProduct({ payload }) {
  const { page = 0, limit = 10 } = payload;
  try {
    const response = yield call([shopService, 'getAllProducts'], {
      page,
      limit,
    });
    yield put(getAllProductSuccess(response));
  } catch (err) {
    yield put(getAllProductFail(err));
  }
}

export function* getNewProduct() {
  const params = {
    page: 0,
    limit: 10,
    sortType: 'NEW_PRODUCT',
  };
  try {
    const response = yield call([shopService, 'getAllProducts'], params);
    yield put(getNewProductsSuccess(response));
  } catch (err) {
    yield put(getNewProductsFail(err));
  }
}

export function* getFlashSale() {
  try {
    const response = yield call([shopService, 'getCurrentFlashSale']);
    yield put(getFlashSaleSuccess(response));
  } catch (err) {
    yield put(getFlashSaleFail(err));
  }
}

export function* getSuggestedProducts() {
  try {
    const response = yield call([shopService, 'getSuggestedProduct']);
    yield put(getSuggestedProductSuccess(response));
  } catch (err) {
    yield put(getSuggestedProductFail(err));
  }
}

export function* getSpotlights() {
  try {
    const response = yield call([shopService, 'getSpotlights']);
    yield put(getSpotlightsSuccess(response));
  } catch (err) {
    yield put(getSpotlightsFail(err));
  }
}

export function* getFeaturedBrands() {
  try {
    const response = yield call([shopService, 'getFeaturedBrands']);
    yield put(getFeaturedBrandsSuccess(response));
  } catch (err) {
    yield put(getFeaturedBrandsFail(err));
  }
}

// Individual exports for testing
export default function* productHomePageSaga() {
  yield takeLatest(GET_ALL_PRODUCT_REQUEST, getAllProduct);
  yield takeLatest(GET_SUGGESTED_PRODUCT_REQUEST, getSuggestedProducts);
  yield takeLatest(GET_SPOTLIGHTS_REQUEST, getSpotlights);
  yield takeLatest(GET_NEW_PRODUCTS_REQUEST, getNewProduct);
  yield takeLatest(GET_FLASH_SALE_REQUEST, getFlashSale);
  yield takeLatest(GET_FEATURED_BRANDS_REQUEST, getFeaturedBrands);
}
