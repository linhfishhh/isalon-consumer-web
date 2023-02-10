/*
 *
 * ProductBestSelling reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_PRODUCT_FOR_CATEGORY_SUCCESS } from './constants';

export const initialState = {
  productsInCategory: {},
};

const productBestSellingReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRODUCT_FOR_CATEGORY_SUCCESS: {
        const payload = get(action, 'payload', []);
        const { categoryId, data } = payload;
        const productsInCategory = { ...cloneDraft.productsInCategory } || {};
        productsInCategory[categoryId] = data;
        cloneDraft.productsInCategory = productsInCategory;
        break;
      }
      default:
        break;
    }
  });

export default productBestSellingReducer;
