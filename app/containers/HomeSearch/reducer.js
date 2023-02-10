/*
 *
 * Search reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getProvinces } from 'utils/localStorage/provinces';
import {
  GET_PROVINCES_SUCCESS,
  GET_SEARCH_HINTS_SUCCESS,
  GET_SEARCH_HINTS_REQUEST,
} from './constants';

export const initialState = {
  provinces: getProvinces(),
  searchHints: [],
  hintsLoading: true,
};

function parserSearchHints(data = {}) {
  const result = [];
  const { cats, salons, services } = data;
  if (!isEmpty(cats)) {
    result.push({ name: 'Danh mục', type: 'category', items: cats });
  }

  if (!isEmpty(services)) {
    result.push({
      name: 'Dịch vụ tại salon',
      type: 'service',
      items: services,
    });
  }

  if (!isEmpty(salons)) {
    result.push({ name: 'Salon gợi ý', type: 'salon', items: salons });
  }
  return result;
}

const searchReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PROVINCES_SUCCESS: {
        cloneDraft.provinces = get(action, 'payload.data', []);
        break;
      }
      case GET_SEARCH_HINTS_REQUEST: {
        cloneDraft.hintsLoading = true;
        break;
      }
      case GET_SEARCH_HINTS_SUCCESS: {
        const data = get(action, 'payload', {});
        cloneDraft.searchHints = parserSearchHints(data);
        cloneDraft.hintsLoading = false;
        break;
      }
      default:
        break;
    }
  });

export default searchReducer;
