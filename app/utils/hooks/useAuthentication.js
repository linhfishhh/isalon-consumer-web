import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  showDialogAction,
  logoutRequest,
} from 'containers/Authentication/actions';
import { showDialogAction as showInviteDialogAction } from 'containers/InviteFriends/actions';
import { CONTEXT } from 'containers/Authentication/constants';
import reducer from 'containers/Authentication/reducer';
import saga from 'containers/Authentication/saga';
import {
  makeSelectAuthenticated,
  makeSelectLoginCompleted,
  makeSelectLogoutSuccess,
  makeSelectUserInfoLogged,
} from 'containers/Authentication/selectors';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const stateSelector = createStructuredSelector({
  authenticated: makeSelectAuthenticated(),
  loginCompleted: makeSelectLoginCompleted(),
  logoutSuccess: makeSelectLogoutSuccess(),
  userInfoLogged: makeSelectUserInfoLogged(),
});

export const useAuthentication = () => {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const dispatch = useDispatch();
  const {
    authenticated,
    loginCompleted,
    logoutSuccess,
    userInfoLogged,
  } = useSelector(stateSelector);

  const showSignInDialog = useCallback(() => {
    dispatch(showDialogAction(true));
  }, []);

  const hideSignInDialog = useCallback(() => {
    dispatch(showDialogAction(false));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const showInviteDialog = useCallback(() => {
    dispatch(showInviteDialogAction(true));
  }, []);

  return {
    authenticated,
    loginCompleted,
    logoutSuccess,
    userInfoLogged,
    showSignInDialog,
    hideSignInDialog,
    logout,
    showInviteDialog,
  };
};
