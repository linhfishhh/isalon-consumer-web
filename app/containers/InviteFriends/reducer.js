/*
 *
 * InviteFriends reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { SHOW_DIALOG } from './constants';

export const initialState = {
  showDialog: false,
};

const inviteFriendsReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SHOW_DIALOG: {
        cloneDraft.showDialog = get(action, 'payload', false);
        break;
      }
      default:
        break;
    }
  });

export default inviteFriendsReducer;
