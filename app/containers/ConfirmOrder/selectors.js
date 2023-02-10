import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the confirmOrder state domain
 */

const selectConfirmOrderDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfirmOrder
 */

const makeSelectConfirmOrder = () =>
  createSelector(
    selectConfirmOrderDomain,
    substate => substate,
  );

const makeSelectOrder = () =>
  createSelector(
    selectConfirmOrderDomain,
    substate => substate.order,
  );

const makeSelectAddress = () =>
  createSelector(
    selectConfirmOrderDomain,
    substate => substate.address,
  );

const makeSelectOrderSuccess = () =>
  createSelector(
    selectConfirmOrderDomain,
    substate => substate.orderSuccess,
  );

export {
  selectConfirmOrderDomain,
  makeSelectOrder,
  makeSelectConfirmOrder,
  makeSelectAddress,
  makeSelectOrderSuccess,
};
