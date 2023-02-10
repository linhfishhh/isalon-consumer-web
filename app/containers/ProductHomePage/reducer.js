/*
 *
 * ProductHomePage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import drop from 'lodash/drop';
import take from 'lodash/take';
import chunk from 'lodash/chunk';
import head from 'lodash/head';
import { isMobileOnly } from 'utils/platform';
import {
  GET_ALL_PRODUCT_SUCCESS,
  GET_SUGGESTED_PRODUCT_SUCCESS,
  GET_SPOTLIGHTS_SUCCESS,
  GET_NEW_PRODUCTS_SUCCESS,
  GET_FLASH_SALE_SUCCESS,
  GET_FEATURED_BRANDS_SUCCESS,
} from './constants';

export const initialState = {
  fetched: false,
  products: {
    contents: [],
    pageInfo: {
      page: 0,
      last: true,
    },
  },
  suggestedProducts: [],
  spotlights: [],
  newProducts: [],
  flashSale: {},
  featuredBrands: [],
};

const parserNewProducts = data => {
  const result = [];
  const numberOfPage = isMobileOnly ? 4 : 7;

  const pages = chunk(data, numberOfPage);

  pages.forEach(item => {
    const mainProduct = head(item);
    const primary = take(drop(item, 1), 3);
    const secondary = take(drop(item, 4), 3);
    result.push({ mainProduct, primary, secondary });
  });

  return result;
};

const productHomePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_ALL_PRODUCT_SUCCESS: {
        const payload = get(action, 'payload.data', {});
        const page = get(payload, 'pageable.pageNumber', 0);
        const currentPage = get(cloneDraft.products, 'pageInfo.page', 0);
        if (page === 0) {
          cloneDraft.products.contents = [...payload.content];
        } else if (page !== currentPage) {
          cloneDraft.products.contents = [
            ...cloneDraft.products.contents,
            ...payload.content,
          ];
        }
        cloneDraft.products.pageInfo = { page, last: payload.last };
        cloneDraft.fetched = true;
        break;
      }
      case GET_SUGGESTED_PRODUCT_SUCCESS: {
        cloneDraft.suggestedProducts = get(action, 'payload.data.content', []);
        cloneDraft.fetched = true;
        break;
      }
      case GET_SPOTLIGHTS_SUCCESS: {
        const data = get(action, 'payload.data', []);
        cloneDraft.spotlights = data;
        cloneDraft.fetched = true;
        break;
      }
      case GET_NEW_PRODUCTS_SUCCESS: {
        const data = get(action, 'payload.data.content', []);
        cloneDraft.newProducts = parserNewProducts(data);
        cloneDraft.fetched = true;
        break;
      }
      case GET_FLASH_SALE_SUCCESS: {
        cloneDraft.flashSale = get(action, 'payload.data', {});
        cloneDraft.fetched = true;
        break;
      }
      case GET_FEATURED_BRANDS_SUCCESS: {
        cloneDraft.featuredBrands = get(action, 'payload.data', []);
        cloneDraft.fetched = true;
        break;
      }
      default:
        break;
    }
  });

export default productHomePageReducer;
