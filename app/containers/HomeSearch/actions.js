/*
 *
 * Search actions
 *
 */
import { createSideEffectAction } from 'utils/reduxHelper';

import { GET_PROVINCES, GET_SEARCH_HINTS } from './constants';

export const [
  getProvincesRequest,
  getProvincesSuccess,
  getProvincesFail,
] = createSideEffectAction(GET_PROVINCES);

export const [
  getSearchHintsRequest,
  getSearchHintsSuccess,
  getSearchHintsFail,
] = createSideEffectAction(GET_SEARCH_HINTS);
