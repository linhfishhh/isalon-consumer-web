/*
 *
 * ProductFaq reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_FAQ_SUCCESS } from './constants';

export const initialState = {
  faqs: {},
};

/* eslint-disable default-case, no-param-reassign */
const productFaqReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_FAQ_SUCCESS:
        cloneDraft.faqs = get(action, 'payload.data', {});
        break;
    }
  });

export default productFaqReducer;
