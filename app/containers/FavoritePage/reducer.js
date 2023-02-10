/*
 *
 * FavoritePage reducer
 *
 */
import produce from 'immer';
import { get, remove } from 'lodash';
import {
  GET_FAVORITED_SALONS_SUCCESS,
  REMOVE_FAVORITED_SALON_SUCCESS,
  REMOVE_FAVORITED_SHOWCASE_SUCCESS,
  GET_FAVORITED_PRODUCTS_SUCCESS,
  REMOVE_FAVORITED_PRODUCT_SUCCESS,
} from './constants';

export const initialState = {
  salons: [],
  showcases: [],
  products: {
    content: [],
    isLast: false,
    currentPage: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const favoritePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_FAVORITED_SALONS_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.salons = get(action, 'payload.salons', []);
        cloneDraft.showcases = get(action, 'payload.showcases', []);
        break;
      }
      case REMOVE_FAVORITED_SALON_SUCCESS: {
        const cloneDraft = draft;
        const id = get(action, 'payload.id', -1);
        const salons = [...cloneDraft.salons];
        if (remove(salons, el => el.id === id)) {
          cloneDraft.salons = salons;
        }
        break;
      }
      case REMOVE_FAVORITED_SHOWCASE_SUCCESS: {
        const cloneDraft = draft;
        const id = get(action, 'payload.id', -1);
        const showcases = [...cloneDraft.showcases];
        if (remove(showcases, el => el.id === id)) {
          cloneDraft.showcases = showcases;
        }
        break;
      }
      case GET_FAVORITED_PRODUCTS_SUCCESS: {
        const cloneDraft = draft;
        const payload = get(action, 'payload.data', {});
        const { last = false, content = [], pageable } = payload;
        const { pageNumber = 0 } = pageable;
        const obj = get(cloneDraft, 'products', {});
        if (pageNumber === 0) {
          obj.content = content;
        } else if (obj.currentPage !== pageNumber) {
          obj.content = [...obj.content, ...content];
        }
        obj.isLast = last;
        obj.currentPage = pageNumber;
        cloneDraft.products = obj;
        break;
      }
      case REMOVE_FAVORITED_PRODUCT_SUCCESS: {
        const cloneDraft = draft;
        const id = get(action, 'payload.productId', -1);
        const products = { ...cloneDraft.products };
        if (remove(products.content, el => el.productId === id)) {
          cloneDraft.products = products;
        }
        break;
      }
    }
  });

export default favoritePageReducer;
