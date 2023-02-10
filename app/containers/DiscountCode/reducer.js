/*
 *
 * DiscountCode reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_DISCOUNT_CODES_SUCCESS } from './constants';

export const initialState = {
  discountCodes: [],
};

/* eslint-disable default-case, no-param-reassign */
const discountCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_DISCOUNT_CODES_SUCCESS: {
        cloneDraft.discountCodes = get(action, 'payload', []);
        break;
      }
    }
  });

export default discountCodeReducer;
