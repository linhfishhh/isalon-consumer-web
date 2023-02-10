import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the addressBook state domain
 */

const selectAddressBookDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressBook
 */

const makeSelectAddressBook = () =>
  createSelector(
    selectAddressBookDomain,
    substate => substate,
  );

const makeSelectMyAddresses = () =>
  createSelector(
    selectAddressBookDomain,
    substate => substate.myAddresses,
  );

const makeSelectMyDefaultAddress = () =>
  createSelector(
    selectAddressBookDomain,
    substate => {
      const findDefault = substate.myAddresses.find(
        address => address.isDefault,
      );
      if (!findDefault && substate.myAddresses.length > 0) {
        if (substate.myAddresses.length > 0) {
          return substate.myAddresses[0];
        }
        return {};
      }
      return findDefault;
    },
  );

export {
  makeSelectAddressBook,
  makeSelectMyAddresses,
  makeSelectMyDefaultAddress,
};
