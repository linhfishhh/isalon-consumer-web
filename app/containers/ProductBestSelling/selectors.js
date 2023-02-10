import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductBestSellingDomain = state => state[CONTEXT] || initialState;

const makeSelectProductList = () =>
  createSelector(
    selectProductBestSellingDomain,
    substate => substate.productList,
  );

export { makeSelectProductList };
