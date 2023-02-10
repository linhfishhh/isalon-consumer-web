import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingHomeService } from 'services';
import { getCoordsSearch } from 'utils/searchHelper';
import { GET_CUSTOM_SALONS_REQUEST } from './constants';
import { getCustomSalonsSuccess, getCustomSalonsFail } from './actions';

export function* getCustomSalons() {
  try {
    const params = getCoordsSearch();
    const response = yield call(
      [bookingHomeService, 'getCustomSalons'],
      params,
    );
    yield put(getCustomSalonsSuccess(response));
  } catch (err) {
    yield put(getCustomSalonsFail(err));
  }
}

// Individual exports for testing
export default function* topSalonsSaga() {
  yield takeLatest(GET_CUSTOM_SALONS_REQUEST, getCustomSalons);
}
