import {
  showDialogAction,
  logoutRequest,
} from 'containers/Authentication/actions';

export function showSignInDialog(dispatch, show = true) {
  dispatch(showDialogAction(show));
}

export function logout(dispatch) {
  dispatch(logoutRequest());
}
