/*
 *
 * ProductDetailPage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import { SEND_COMMENT_SUCCESS } from 'containers/ProductComment/constants';
import {
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_VARIANT_VALUES_SUCCESS,
  GET_PRODUCT_VARIANTS_SUCCESS,
  GET_VIEWED_PRODUCTS_SUCCESS,
  LIKE_PRODUCT_SUCCESS,
  UNLIKE_PRODUCT_SUCCESS,
  CLEAR_PRODUCT_DETAIL,
} from './constants';

export const initialState = {
  error: {},
  productDetail: {},
  variantValues: [],
  productVariants: [],
  viewedProducts: [],
};

const productDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRODUCT_DETAIL_SUCCESS: {
        const product = get(action, 'payload', {});
        cloneDraft.productDetail = product;
        cloneDraft.error = {};
        break;
      }
      case GET_PRODUCT_VARIANT_VALUES_SUCCESS: {
        cloneDraft.variantValues = get(action, 'payload', []);
        cloneDraft.error = {};
        break;
      }
      case GET_PRODUCT_VARIANTS_SUCCESS: {
        cloneDraft.productVariants = get(action, 'payload', []);
        cloneDraft.error = {};
        break;
      }
      case GET_VIEWED_PRODUCTS_SUCCESS: {
        cloneDraft.viewedProducts = get(action, 'payload', []);
        cloneDraft.error = {};
        break;
      }
      case LIKE_PRODUCT_SUCCESS:
      case UNLIKE_PRODUCT_SUCCESS: {
        const data = get(action, 'payload', {
          productId: -1,
          isFavorite: false,
        });
        const { productId, isFavorite } = data;
        if (productId === get(cloneDraft, 'productDetail.productId')) {
          set(cloneDraft, 'productDetail.isFavorite', isFavorite);
        }
        break;
      }
      case CLEAR_PRODUCT_DETAIL: {
        cloneDraft.error = {};
        cloneDraft.productDetail = {};
        cloneDraft.variantValues = [];
        cloneDraft.productVariants = [];
        cloneDraft.viewedProducts = [];
        break;
      }
      case SEND_COMMENT_SUCCESS: {
        const p = { ...cloneDraft.productDetail };
        p.isReviewable = false;
        cloneDraft.productDetail = p;
        break;
      }
      default:
        break;
    }
  });

export default productDetailPageReducer;
