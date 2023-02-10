/*
 *
 * ProductBestSelling reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_PRODUCT_LIST_SUCCESS } from './constants';

export const initialState = {
  productList: [],
};

const productBestSellingReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRODUCT_LIST_SUCCESS:
        cloneDraft.productList = get(action, 'payload.data.content', []);
        break;
      default:
        break;
    }
  });

export default productBestSellingReducer;
