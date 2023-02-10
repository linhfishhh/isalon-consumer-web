import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectCommonProduct = state => state[CONTEXT] || initialState;

const makeSelectProductsInCategory = () =>
  createSelector(
    selectCommonProduct,
    state => state.productsInCategory,
  );

export { makeSelectProductsInCategory };
