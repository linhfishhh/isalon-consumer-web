import { takeEvery, call, put } from 'redux-saga/effects';
import { searchService } from 'services';
import get from 'lodash/get';
import { DEFAULT_PAGE_SIZE } from 'utils/constants';
import {
  getProductForCategorySuccess,
  getProductForCategoryFail,
} from './actions';
import { GET_PRODUCT_FOR_CATEGORY_REQUEST } from './constants';

export function* getProductsInCategory({ payload }) {
  const { categoryId } = payload;
  try {
    const response = yield call([searchService, 'findProducts'], {
      categoryIds: `${categoryId}`,
      page: 0,
      limit: DEFAULT_PAGE_SIZE,
    });
    yield put(
      getProductForCategorySuccess({
        categoryId: `${categoryId}`,
        data: get(response, 'data.content'),
      }),
    );
  } catch (err) {
    yield put(getProductForCategoryFail(err));
  }
}
export default function* commonProductSaga() {
  yield takeEvery(GET_PRODUCT_FOR_CATEGORY_REQUEST, getProductsInCategory);
}
