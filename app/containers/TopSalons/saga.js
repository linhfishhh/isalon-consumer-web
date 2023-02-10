import { takeLatest, call, put } from 'redux-saga/effects';
import { bookingHomeService } from 'services';
import { searchParamsDefault, getCoordsSearch } from 'utils/searchHelper';
import { viewTypes } from 'utils/enums';
import {
  GET_SALONS_NEAR_ME_REQUEST,
  GET_TOP_SALONS_REQUEST,
} from './constants';
import {
  getSalonsNearMeSuccess,
  getSalonsNearMeFail,
  getTopSalonsSuccess,
  getTopSalonsFail,
} from './actions';

export function* getSalonsNearMe() {
  try {
    const viewType = viewTypes.valueWithIndex(2);
    const coords = getCoordsSearch({ viewType });
    const params = searchParamsDefault({
      ...coords,
      view_type: viewType,
      distance: 10,
      search_type: 'salon',
    });
    const response = yield call([bookingHomeService, 'getSalonNearMe'], params);
    yield put(getSalonsNearMeSuccess(response));
  } catch (err) {
    yield put(getSalonsNearMeFail(err));
  }
}

export function* getTopSalons({ payload }) {
  try {
    const { province } = payload;
    const coords = getCoordsSearch();
    const params = { provinceId: province.provinceId, ...coords };
    const response = yield call([bookingHomeService, 'getTopSalon'], params);
    yield put(getTopSalonsSuccess(response));
  } catch (err) {
    yield put(getTopSalonsFail(err));
  }
}

// Individual exports for testing
export default function* topSalonsSaga() {
  yield takeLatest(GET_SALONS_NEAR_ME_REQUEST, getSalonsNearMe);
  yield takeLatest(GET_TOP_SALONS_REQUEST, getTopSalons);
}
