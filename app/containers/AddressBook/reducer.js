/*
 *
 * AddressBook reducer
 *
 */
import produce from 'immer';
import { get, remove } from 'lodash';
import {
  GET_MY_ADDRESSES_SUCCESS,
  DELETE_MY_ADDRESS_SUCCESS,
} from './constants';

export const initialState = {
  myAddresses: [],
};

const addressBookReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MY_ADDRESSES_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.myAddresses = get(action, 'payload.data', []);
        break;
      }
      case DELETE_MY_ADDRESS_SUCCESS: {
        const cloneDraft = draft;
        const deletedAddress = get(action, 'payload.data', {});
        const { addressId } = deletedAddress;
        const newAddresses = [...cloneDraft.myAddresses];
        if (remove(newAddresses, addr => addr.addressId === addressId)) {
          cloneDraft.myAddresses = newAddresses;
        }

        break;
      }
      default:
        break;
    }
  });

export default addressBookReducer;
