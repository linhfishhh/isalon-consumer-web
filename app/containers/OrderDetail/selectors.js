import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the header state domain
 */

const selectOrderDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectOrderDetail = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.orderDetail,
  );

export { makeSelectOrderDetail };
