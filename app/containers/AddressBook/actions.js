/*
 *
 * AddressBook actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_MY_ADDRESSES, DELETE_MY_ADDRESS } from './constants';

export const [
  getMyAddressesRequest,
  getMyAddressesSuccess,
  getMyAddressesFail,
] = createSideEffectAction(GET_MY_ADDRESSES);
export const [
  deleteMyAddressRequest,
  deleteMyAddressSuccess,
  deleteMyAddressFail,
] = createSideEffectAction(DELETE_MY_ADDRESS);
