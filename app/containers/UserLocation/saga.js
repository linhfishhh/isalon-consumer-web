import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService, googleMapService } from 'services';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { setCurrentPosition } from 'utils/localStorage/location';
import { setCurrentLocationAction } from 'containers/GlobalState/actions';
import { unitToAddress } from 'utils/searchHelper';

import {
  getAllUnitsSuccess,
  getAllUnitsFail,
  getDistrictListSuccess,
  getDistrictListFail,
  getWardListSuccess,
  getWardListFail,
} from './actions';
import {
  GET_ALL_UNITS_REQUEST,
  GET_DISTRICT_LIST_REQUEST,
  GET_WARD_LIST_REQUEST,
  CHANGE_LOCATION,
} from './constants';

export function* getAllUnits({ payload }) {
  try {
    const { province, district } = payload;

    let districts = [];
    if (!isEmpty(province)) {
      const districtsResponse = yield call(
        [profileService, 'getDistrictList'],
        province.provinceId,
      );
      districts = get(districtsResponse, 'data', []);
    }

    let wards = [];
    if (!isEmpty(district)) {
      const wardsResponse = yield call(
        [profileService, 'getWardList'],
        district.districtId,
      );
      wards = get(wardsResponse, 'data', []);
    }
    yield put(getAllUnitsSuccess({ districts, wards }));
  } catch (err) {
    yield put(getAllUnitsFail(err));
  }
}

export function* getDistrictList({ payload }) {
  try {
    const response = yield call([profileService, 'getDistrictList'], payload);
    const districts = get(response, 'data', []);
    yield put(getDistrictListSuccess(districts));
  } catch (err) {
    yield put(getDistrictListFail(err));
  }
}

export function* getWardList({ payload }) {
  try {
    const response = yield call([profileService, 'getWardList'], payload);
    const wards = get(response, 'data', []);
    yield put(getWardListSuccess(wards));
  } catch (err) {
    yield put(getWardListFail(err));
  }
}

export function* changeLocation({ payload }) {
  try {
    const { province, district, ward } = payload;
    const address = unitToAddress(province, district, ward);

    const response = yield call([googleMapService, 'getGeocoding'], {
      address,
    });
    const position = get(response, 'results[0].geometry.location');
    if (!isEmpty(position)) {
      setCurrentPosition({
        position,
        province,
        district,
        ward,
        address,
        isCustom: true,
      });
      yield put(
        setCurrentLocationAction({
          position,
          province,
          address,
          isCustom: true,
        }),
      );
    }
  } catch (err) {
    //
  }
}

export default function* userLocationSaga() {
  yield takeLatest(GET_ALL_UNITS_REQUEST, getAllUnits);
  yield takeLatest(GET_DISTRICT_LIST_REQUEST, getDistrictList);
  yield takeLatest(GET_WARD_LIST_REQUEST, getWardList);
  yield takeLatest(CHANGE_LOCATION, changeLocation);
}
