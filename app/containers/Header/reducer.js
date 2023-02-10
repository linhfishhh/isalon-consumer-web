/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { SHOW_CART_NOTIFICATION } from './constants';

export const initialState = {
  openCartNotification: false,
};

const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SHOW_CART_NOTIFICATION: {
        cloneDraft.openCartNotification = get(action, 'payload', false);
        break;
      }
      default:
        break;
    }
  });

export default headerReducer;
