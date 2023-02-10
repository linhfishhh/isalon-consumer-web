import { takeLatest, call, put } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import compact from 'lodash/compact';
import flattenDeep from 'lodash/flattenDeep';
import {
  setCurrentPosition,
  getPosition,
  isCustomPosition,
  getCurrentPosition,
} from 'utils/localStorage/location';
import { setSearchConfigs } from 'utils/localStorage/search';
import { setProvinces, getProvinces } from 'utils/localStorage/provinces';
import {
  bookingSearchService,
  googleMapService,
  bookingHomeService,
} from 'services';

import {
  GET_DEFAULT_POSITION,
  GET_PROVINCE_BY_POSITION,
  GET_GLOBAL_CONFIG_REQUEST,
  GET_SEARCH_CONFIG_REQUEST,
} from './constants';
import {
  setCurrentLocationAction,
  setProvinceListAction,
  getGlobalConfigSuccess,
  getGlobalConfigFail,
  getSearchConfigSuccess,
  getSearchConfigFail,
} from './actions';

export function* getDefaultPosition() {
  try {
    const provinceList = getProvinces();
    const currentLocation = getCurrentPosition();
    if (provinceList.length <= 0 || isEmpty(currentLocation)) {
      const response = yield call([bookingSearchService, 'getProvinceList']);
      const provinces = response.map(item => ({
        provinceId: item.id,
        ...item,
      }));
      setProvinces(provinces);
      const province = provinces.find(item => item.id === 1);
      const { lat, lng } = province;
      const position = { lat, lng };
      const address = province.name;
      setCurrentPosition({ position, province, address });
      yield put(setCurrentLocationAction({ position, province, address }));
      yield put(setProvinceListAction(provinces));
    }
  } catch (err) {
    //
  }
}

export function* getProvinceByPosition({ payload }) {
  try {
    const currentPosition = getPosition();
    const isCustom = isCustomPosition();
    const { position } = payload;

    const canUpdatePosition =
      currentPosition &&
      (position.lat !== currentPosition.lat &&
        position.lng !== currentPosition.lng);

    if (!currentPosition || (!isCustom && canUpdatePosition)) {
      const latlng = `${position.lat},${position.lng}`;
      const response = yield call([googleMapService, 'getGeocoding'], {
        latlng,
      });
      const allUnit = getAllUnit(response);
      const address = allUnit.map(item => item.short_name).join(', ');
      const provinceUnit = allUnit.find(item =>
        item.types.includes('administrative_area_level_1'),
      );
      if (!isEmpty(provinceUnit)) {
        const location = yield call([bookingSearchService, 'findLocation'], {
          find: provinceUnit.short_name,
        });

        const provinces = getProvinces();
        if (location) {
          const province = provinces.find(
            item => item.provinceId === location.id,
          );
          setCurrentPosition({ position, province, address, isCustom: false });
          yield put(
            setCurrentLocationAction({
              position,
              province,
              address,
              isCustom: false,
            }),
          );
        }
      } else {
        setCurrentPosition({ position, address, isCustom: false });
        yield put(
          setCurrentLocationAction({ position, address, isCustom: false }),
        );
      }
    }
  } catch (err) {
    //
  }
}

const getAllUnit = response => {
  const results = get(response, 'results', []);
  const types = [
    'administrative_area_level_3',
    'administrative_area_level_2',
    'administrative_area_level_1',
  ];
  const units = flattenDeep(results.flatMap(item => item.address_components));
  const unitResult = compact(
    types.map(type => units.find(item => item.types.includes(type))),
  );
  return unitResult;
};

export function* getGlobalConfig() {
  try {
    const response = yield call([bookingHomeService, 'getGlobalConfig']);
    yield put(getGlobalConfigSuccess(response));
  } catch (err) {
    yield put(getGlobalConfigFail(err));
  }
}

export function* getSearchConfigs() {
  try {
    const response = yield call([bookingSearchService, 'getSearchConfigs']);
    setSearchConfigs(response);
    yield put(getSearchConfigSuccess(response));
  } catch (err) {
    yield put(getSearchConfigFail(err));
  }
}

export default function* globalStateSaga() {
  yield takeLatest(GET_DEFAULT_POSITION, getDefaultPosition);
  yield takeLatest(GET_PROVINCE_BY_POSITION, getProvinceByPosition);
  yield takeLatest(GET_GLOBAL_CONFIG_REQUEST, getGlobalConfig);
  yield takeLatest(GET_SEARCH_CONFIG_REQUEST, getSearchConfigs);
}
