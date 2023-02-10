import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the productDetailPage state domain
 */

const selectProductDetailPageDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductDetailPage
 */

const makeSelectProductDetail = () =>
  createSelector(
    selectProductDetailPageDomain,
    state => state.productDetail,
  );

const makeSelectProductVariantValues = () =>
  createSelector(
    selectProductDetailPageDomain,
    state => state.variantValues,
  );

const makeSelectProductVariants = () =>
  createSelector(
    selectProductDetailPageDomain,
    state => state.productVariants,
  );

const makeSelectViewedProducts = () =>
  createSelector(
    selectProductDetailPageDomain,
    state => state.viewedProducts,
  );

export {
  makeSelectProductDetail,
  makeSelectProductVariantValues,
  makeSelectProductVariants,
  makeSelectViewedProducts,
};
