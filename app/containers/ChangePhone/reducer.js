/*
 *
 * DiscountCode reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_VERIFICATION_CODE_SUCCESS,
  VERIFY_CODE_SUCCESS,
  GET_VERIFICATION_CODE_FAIL,
  CLEAR_DATA,
} from './constants';

export const initialState = {
  error: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const discountCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_VERIFICATION_CODE_SUCCESS: {
        break;
      }
      case GET_VERIFICATION_CODE_FAIL: {
        const payload = get(action, 'payload');
        cloneDraft.error = payload;
        break;
      }
      case VERIFY_CODE_SUCCESS: {
        break;
      }
      case CLEAR_DATA: {
        cloneDraft.error = undefined;
      }
    }
  });

export default discountCodeReducer;
