/*
 *
 * GlobalState reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  getPosition,
  getProvince,
  getAddress,
  isCustomPosition,
} from 'utils/localStorage/location';
import { getProvinces } from 'utils/localStorage/provinces';
import {
  SET_CURRENT_LOCATION,
  SET_PROVINCE_LIST,
  REFRESH_LOCATION,
  GET_GLOBAL_CONFIG_SUCCESS,
  UPDATE_STACK_NUMBER_PAGE,
  GET_SEARCH_CONFIG_SUCCESS,
} from './constants';

export const initialState = {
  stackNumberPage: 0,
  currentLocation: {
    position: getPosition(),
    province: getProvince(),
    address: getAddress(),
    isCustom: isCustomPosition(),
    error: false,
  },
  refreshLocation: false,
  provinces: getProvinces(),
  globalConfig: {},
  searchConfig: {},
};

const globalStateReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SET_CURRENT_LOCATION: {
        const location = get(action, 'payload');
        cloneDraft.currentLocation = { ...state.currentLocation, ...location };
        cloneDraft.refreshLocation = false;
        break;
      }
      case SET_PROVINCE_LIST: {
        cloneDraft.provinces = get(action, 'payload', []);
        break;
      }
      case REFRESH_LOCATION: {
        cloneDraft.refreshLocation = true;
        break;
      }
      case GET_GLOBAL_CONFIG_SUCCESS: {
        cloneDraft.globalConfig = get(action, 'payload', []);
        break;
      }
      case UPDATE_STACK_NUMBER_PAGE: {
        cloneDraft.stackNumberPage += 1;
        break;
      }
      case GET_SEARCH_CONFIG_SUCCESS: {
        cloneDraft.searchConfig = get(action, 'payload', []);
        break;
      }
      default:
        break;
    }
  });

export default globalStateReducer;
