/*
 *
 * BecomeSalonManager reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_CONTACT_PAGE_CFG_SUCCESS } from './constants';

export const initialState = {
  contactCfg: {},
};

/* eslint-disable default-case, no-param-reassign */
const becomeSalonManagerReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_CONTACT_PAGE_CFG_SUCCESS: {
        const cfg = get(action, 'payload', {});
        cloneDraft.contactCfg = cfg;
        break;
      }
    }
  });

export default becomeSalonManagerReducer;
