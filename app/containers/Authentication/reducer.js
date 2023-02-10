/*
 *
 * Authentication reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { isAuthenticated, getLoggedInUser } from 'utils/auth';
import {
  SHOW_DIALOG,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAN_DATA,
  VERIFY_PHONE_REQUEST,
  VERIFY_PHONE_FAIL,
  LOGIN_COMPLETED,
  UPDATE_USER_INFO,
  VERIFY_TOKEN_SUCCESS,
} from './constants';

export const initialState = {
  showDialog: false,
  loginSuccess: false,
  loginCompleted: false,
  logoutSuccess: false,
  authenticated: isAuthenticated(),
  isError: false,
  message: '',
  verifyPhoneMessage: '',
  userInfoLogged: getLoggedInUser() || {},
  forceRetry: false,
};

const signInReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case SHOW_DIALOG: {
        cloneDraft.showDialog = get(action, 'payload', false);
        break;
      }
      case LOGIN_REQUEST: {
        cloneDraft.isError = false;
        cloneDraft.message = '';
        break;
      }
      case LOGIN_SUCCESS: {
        cloneDraft.userInfoLogged = get(action, 'payload', {});
        cloneDraft.loginSuccess = true;
        cloneDraft.logoutSuccess = false;
        cloneDraft.authenticated = true;
        cloneDraft.isError = false;
        cloneDraft.message = '';
        break;
      }
      case LOGIN_FAIL: {
        cloneDraft.isError = true;
        cloneDraft.message =
          'Chúng tôi không thể xác minh mã của bạn.\n Vui lòng thử lại!';
        cloneDraft.forceRetry = true;
        break;
      }
      case LOGOUT_SUCCESS:
      case LOGOUT_FAIL: {
        cloneDraft.authenticated = false;
        cloneDraft.logoutSuccess = true;
        cloneDraft.userInfoLogged = {};
        cloneDraft.loginCompleted = false;
        break;
      }
      case CLEAN_DATA: {
        // DO NOT clear forceRetry flag
        cloneDraft.loginSuccess = initialState.loginSuccess;
        cloneDraft.isError = initialState.isError;
        cloneDraft.message = initialState.message;
        cloneDraft.verifyPhoneMessage = initialState.verifyPhoneMessage;
        cloneDraft.loginCompleted = initialState.loginCompleted;
        break;
      }
      case VERIFY_PHONE_REQUEST: {
        cloneDraft.verifyPhoneMessage = '';
        break;
      }
      case VERIFY_PHONE_FAIL: {
        const payload = get(action, 'payload.data', {});
        const { message } = payload;
        cloneDraft.verifyPhoneMessage = message || '';
        cloneDraft.forceRetry = true;
        break;
      }
      case LOGIN_COMPLETED: {
        cloneDraft.loginCompleted = true;
        break;
      }
      case UPDATE_USER_INFO: {
        const userInfo = get(action, 'payload', {});
        cloneDraft.userInfoLogged = {
          ...cloneDraft.userInfoLogged,
          ...userInfo,
        };
        break;
      }
      case VERIFY_TOKEN_SUCCESS: {
        cloneDraft.userInfoLogged = get(action, 'payload', {});
        break;
      }
      default:
        break;
    }
  });

export default signInReducer;
