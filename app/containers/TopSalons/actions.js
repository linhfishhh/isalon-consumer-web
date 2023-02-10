/*
 *
 * TopSalons actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_SALONS_NEAR_ME,
  GET_TOP_SALONS,
  UPDATE_LATEST_LOCATION,
} from './constants';

export const [
  getSalonsNearMeRequest,
  getSalonsNearMeSuccess,
  getSalonsNearMeFail,
] = createSideEffectAction(GET_SALONS_NEAR_ME);

export const [
  getTopSalonsRequest,
  getTopSalonsSuccess,
  getTopSalonsFail,
] = createSideEffectAction(GET_TOP_SALONS);

export const updateLatestLocationAction = createSingleAction(
  UPDATE_LATEST_LOCATION,
);
