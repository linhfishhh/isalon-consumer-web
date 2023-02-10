/*
 *
 * BecomeSalonManager reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_PRIVACY_SUCCESS } from './constants';

export const initialState = {
  tos: '',
};

/* eslint-disable default-case, no-param-reassign */
const privacyReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRIVACY_SUCCESS: {
        const tos = get(action, 'payload', '');
        cloneDraft.tos = tos;
        break;
      }
    }
  });

export default privacyReducer;
