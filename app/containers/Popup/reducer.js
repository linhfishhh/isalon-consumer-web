/*
 *
 * Popup reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { SHOW_POPUP_ACTION } from './constants';

export const initialState = {
  open: false,
};

const popupReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case SHOW_POPUP_ACTION:
        draftClone.open = get(action, 'payload', false);
        break;
      default:
        break;
    }
  });

export default popupReducer;
