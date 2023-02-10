/*
 *
 * UserLocation actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_ALL_UNITS,
  GET_DISTRICT_LIST,
  GET_WARD_LIST,
  CHANGE_LOCATION,
} from './constants';

export const [
  getAllUnitsRequest,
  getAllUnitsSuccess,
  getAllUnitsFail,
] = createSideEffectAction(GET_ALL_UNITS);

export const [
  getDistrictListRequest,
  getDistrictListSuccess,
  getDistrictListFail,
] = createSideEffectAction(GET_DISTRICT_LIST);

export const [
  getWardListRequest,
  getWardListSuccess,
  getWardListFail,
] = createSideEffectAction(GET_WARD_LIST);

export const changeLocationAction = createSingleAction(CHANGE_LOCATION);
