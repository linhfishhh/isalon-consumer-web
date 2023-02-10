/*
 *
 * ConfirmOrder reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  PAY_SUCCESS,
  PRE_PAY_SUCCESS,
  SELECT_ADDRESS,
  CLEAR_STATE,
} from './constants';

export const initialState = {
  order: undefined,
  address: undefined,
  orderSuccess: false,
};

const confirmOrderReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case PRE_PAY_SUCCESS: {
        cloneDraft.order = action.payload;
        break;
      }
      case PAY_SUCCESS: {
        cloneDraft.orderSuccess = true;
        cloneDraft.order = action.payload;
        break;
      }
      case SELECT_ADDRESS: {
        const address = get(action, 'payload');
        if (address) {
          cloneDraft.address = address;
        }
        break;
      }
      case CLEAR_STATE: {
        cloneDraft.order = initialState.order;
        cloneDraft.address = initialState.address;
        cloneDraft.orderSuccess = initialState.orderSuccess;
        break;
      }
      default:
        break;
    }
  });

export default confirmOrderReducer;
