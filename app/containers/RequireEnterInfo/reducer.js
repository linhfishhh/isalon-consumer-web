/*
 *
 * RequireEnterInfo reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAIL,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  updateSuccess: false,
  message: '',
};

const requireEnterInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case UPDATE_EMAIL_SUCCESS:
        draftClone.updateSuccess = true;
        break;
      case UPDATE_EMAIL_FAIL: {
        draftClone.message = get(action, 'payload', []);
        break;
      }
      case CLEAN_DATA: {
        draftClone.updateSuccess = false;
        draftClone.message = '';
        break;
      }
      default:
        break;
    }
  });

export default requireEnterInfoReducer;
