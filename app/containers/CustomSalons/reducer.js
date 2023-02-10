/*
 *
 * CustomSalons reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { GET_CUSTOM_SALONS_SUCCESS } from './constants';

export const initialState = {
  fetched: false,
  customSalons: [],
};

const customSalonsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_CUSTOM_SALONS_SUCCESS: {
        cloneDraft.customSalons = get(action, 'payload', []);
        cloneDraft.fetched = true;
        break;
      }
      default:
        break;
    }
  });

export default customSalonsReducer;
