/*
 *
 * BecomeSalonManager reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_HELP_SUCCESS } from './constants';

export const initialState = {
  help: [],
};

/* eslint-disable default-case, no-param-reassign */
const helpReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_HELP_SUCCESS: {
        const help = get(action, 'payload', []);
        cloneDraft.help = help;
        break;
      }
    }
  });

export default helpReducer;
