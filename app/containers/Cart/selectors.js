import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the cart state domain
 */

const selectCartDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectCartDomain,
    substate => substate.loading,
  );

const makeSelectCart = () =>
  createSelector(
    selectCartDomain,
    substate => substate.cart,
  );

const makeSelectNumberSelectedItems = () =>
  createSelector(
    selectCartDomain,
    substate =>
      (substate.cart &&
        substate.cart.items.filter(item => item.isSelected).length) ||
      0,
  );

const makeSelectIsCheckedAll = () =>
  createSelector(
    selectCartDomain,
    substate =>
      (substate.cart &&
        substate.cart.items.filter(item => !item.isSelected).length === 0) ||
      false,
  );

const makeSelectPrice = () =>
  createSelector(
    selectCartDomain,
    substate => substate.price,
  );

const makeSelectAddress = () =>
  createSelector(
    selectCartDomain,
    substate => substate.address,
  );

const makeSelectErrors = () =>
  createSelector(
    selectCartDomain,
    substate => substate.errors,
  );

const makeSelectGiftCode = () =>
  createSelector(
    selectCartDomain,
    substate => substate.giftCode,
  );

const makeSelectCartQuantity = () =>
  createSelector(
    selectCartDomain,
    substate => substate.cartQuantity,
  );

const makeSelectSelectedItems = () =>
  createSelector(
    selectCartDomain,
    substate =>
      (substate.cart && substate.cart.items.filter(item => item.isSelected)) ||
      [],
  );

export {
  selectCartDomain,
  makeSelectLoading,
  makeSelectCart,
  makeSelectNumberSelectedItems,
  makeSelectIsCheckedAll,
  makeSelectPrice,
  makeSelectAddress,
  makeSelectErrors,
  makeSelectGiftCode,
  makeSelectCartQuantity,
  makeSelectSelectedItems,
};
