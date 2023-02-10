/*
 *
 * TopSalons reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_SALONS_NEAR_ME_SUCCESS,
  GET_TOP_SALONS_SUCCESS,
  UPDATE_LATEST_LOCATION,
} from './constants';

export const initialState = {
  latestLocation: { position: {}, province: {} },
  salonsNearMe: [],
  topSalons: [],
};

const topSalonsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_SALONS_NEAR_ME_SUCCESS: {
        cloneDraft.salonsNearMe = get(action, 'payload.items', []);
        break;
      }
      case GET_TOP_SALONS_SUCCESS: {
        cloneDraft.topSalons = get(action, 'payload', []);
        break;
      }
      case UPDATE_LATEST_LOCATION: {
        const data = get(action, 'payload', {});
        const { latestLocation } = cloneDraft;
        cloneDraft.latestLocation = { ...latestLocation, ...data };
        break;
      }
      default:
        break;
    }
  });

export default topSalonsReducer;
