/**
 *
 * Authentication
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent, Paper, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import get from 'lodash/get';

import Button from 'components/Button';
import Img from 'components/Img';
import AreaSafe from 'components/AreaSafe';
import Transition from 'components/Transition';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isAuthenticated, getLoggedInUser } from 'utils/auth';
import pushNotification from 'utils/pushNotification';
import {
  getAffiliateToken,
  removeAffiliateToken,
} from 'utils/localStorage/affiliate';
import Logo from 'assets/images/logo.png';
import { path } from 'routers/path';

import {
  showLoadingAction,
  hideLoadingAction,
} from 'containers/LoadingInPage/actions';

import {
  showDialogAction,
  loginRequest,
  loginSocialRequest,
  fbVerifyPhoneRequest,
  verifyPhoneRequest,
  createAccountRequest,
  verifyTokenRequest,
  loginCompletedAction,
  cleanDataAction,
} from './actions';
import {
  makeSelectShowDialog,
  makeSelectLoginSuccess,
  makeSelectIsError,
  makeSelectMessage,
  makeSelectLogoutSuccess,
  makeSelectVerifyPhoneMessage,
  makeSelectForceRetry,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';

import EntryView from './Views/Entry';
import VerifyView from './Views/Verify';
import SuccessView from './Views/Success';
import EnterPhone from './Views/EnterPhone';
import { useStyles } from './styles';

export function Authentication(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    dispatch,
    open,
    onClose,
    showLoading,
    hideLoading,
    login,
    loginSocial,
    fbVerifyPhone,
    verifyPhone,
    createAccount,
    verifyToken,
    cleanData,
    loginSuccess,
    logoutSuccess,
    isError,
    message,
    verifyPhoneMessage,
    loginCompleted,
    forceRetry,
  } = props;

  const history = useHistory();

  const [step, setStep] = useState('signIn');
  const [loginType, setLoginType] = useState('phone');
  const [phoneSignIn, setPhoneSignIn] = useState('');
  const [sessionInfo, setSessionInfo] = useState();
  const [userFacebook, setUserFacebook] = useState();

  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated()) {
      verifyToken();
    }
  }, []);

  useEffect(() => {
    if (open) {
      setStep('signIn');
    } else {
      cleanData();
    }
  }, [open]);

  useEffect(() => {
    if (loginSuccess) {
      setStep('success');
      loading(false);
      const user = getLoggedInUser();
      pushNotification.sendTags({ user_id: user.user_id });
    }
    if (isError) {
      loading(false);
    }
  }, [loginSuccess, isError]);

  useEffect(() => {
    if (logoutSuccess) {
      pushNotification.deleteTags(['user_id']);
      if (!isMobileOnly) {
        history.push(path.home);
      }
    }
  }, [logoutSuccess]);

  const handleCloseSuccess = () => {
    onClose();
    loginCompleted();
  };

  const handleUserClose = () => {
    onClose();
    const at = getAffiliateToken();
    if (at) {
      removeAffiliateToken();
      history.push(path.home);
    }
  };

  const loading = show => {
    if (show) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  };

  const onFBSendVerifyCode = (phone, retry) => {
    loading(true);
    setLoginType('phone');
    fbVerifyPhone({
      phone,
      // retry: forceRetry === true ? 1 : retry,
      retry: 1, // ! STOP USE FIREBASE AUTHENTICATION
      success: info => {
        setPhoneSignIn(phone);
        setSessionInfo(info);
        setStep('verify');
        loading(false);
      },
      failure: () => {
        loading(false);
        setSessionInfo(null);
      },
    });
  };

  const onVerify = code => {
    loading(true);
    if (loginType === 'phone') {
      const token = get(sessionInfo, 'data.sessionInfo');
      const type = get(sessionInfo, 'type', 'firebase');
      login({ phone: phoneSignIn, code, token, type });
    } else if (loginType === 'facebook') {
      createAccount({
        phone: phoneSignIn,
        token: userFacebook.accessToken,
        code,
        provider: 'facebook',
      });
    }
  };

  const onSignInFaceBook = user => {
    setLoginType('facebook');
    setUserFacebook(user);
    loginSocial({
      data: { token: user.accessToken, provider: 'facebook' },
      accountNotExist: () => {
        loading(false);
        setStep('enterPhone');
      },
    });
  };

  const onVerifyPhone = phone => {
    setPhoneSignIn(phone);
    sendVerifyCode(phone);
  };

  const sendVerifyCode = phone => {
    if (userFacebook && !isEmpty(phone)) {
      loading(true);
      verifyPhone({
        data: {
          phone,
        },
        success: () => {
          loading(false);
          setStep('verify');
        },
        failure: () => loading(false),
      });
    }
  };

  const onResendVerifyCode = () => {
    if (loginType === 'phone') {
      onFBSendVerifyCode(phoneSignIn, 1);
    } else if (loginType === 'facebook') {
      sendVerifyCode(phoneSignIn);
    }
    cleanData();
  };

  return (
    <Dialog
      fullScreen
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <DialogContent className={classes.background}>
        {!isMobileOnly && (
          <Button
            icon="close"
            type="iconButton"
            onClick={handleUserClose}
            className={classes.btnClose}
          />
        )}
        <div className={classes.wrapper}>
          {isMobileOnly && (
            <>
              <AreaSafe />
              {(step === 'verify' || step === 'enterPhone') && (
                <IconButton onClick={handleUserClose}>
                  <CloseIcon />
                </IconButton>
              )}
              {step === 'signIn' && <Img src={Logo} className={classes.logo} />}
            </>
          )}
          <Paper className={classes.paper}>
            {step === 'signIn' && (
              <EntryView
                onSignIn={onFBSendVerifyCode}
                onSignInFaceBook={onSignInFaceBook}
                onClose={handleUserClose}
              />
            )}
            {step === 'verify' && (
              <VerifyView
                phone={phoneSignIn}
                errorMessage={message}
                onVerify={onVerify}
                onResendVerifyCode={onResendVerifyCode}
                onClose={handleUserClose}
              />
            )}
            {step === 'success' && <SuccessView onClose={handleCloseSuccess} />}
            {step === 'enterPhone' && (
              <EnterPhone
                user={userFacebook}
                onVerifyPhone={onVerifyPhone}
                errorMessage={verifyPhoneMessage}
              />
            )}
          </Paper>
        </div>
      </DialogContent>
    </Dialog>
  );
}

Authentication.defaultProps = {
  open: false,
};

Authentication.propTypes = {
  dispatch: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  showLoading: PropTypes.func,
  hideLoading: PropTypes.func,
  login: PropTypes.func,
  loginSocial: PropTypes.func,
  fbVerifyPhone: PropTypes.func,
  verifyPhone: PropTypes.func,
  createAccount: PropTypes.func,
  cleanData: PropTypes.func,
  verifyToken: PropTypes.func,
  loginSuccess: PropTypes.bool,
  logoutSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  verifyPhoneMessage: PropTypes.string,
  loginCompleted: PropTypes.func,
  forceRetry: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loginSuccess: makeSelectLoginSuccess(),
  isError: makeSelectIsError(),
  message: makeSelectMessage(),
  open: makeSelectShowDialog(),
  logoutSuccess: makeSelectLogoutSuccess(),
  verifyPhoneMessage: makeSelectVerifyPhoneMessage(),
  forceRetry: makeSelectForceRetry(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoading: () => dispatch(showLoadingAction()),
    hideLoading: () => dispatch(hideLoadingAction()),
    login: payload => dispatch(loginRequest(payload)),
    loginSocial: payload => dispatch(loginSocialRequest(payload)),
    fbVerifyPhone: payload => dispatch(fbVerifyPhoneRequest(payload)),
    verifyPhone: payload => dispatch(verifyPhoneRequest(payload)),
    createAccount: payload => dispatch(createAccountRequest(payload)),
    verifyToken: () => dispatch(verifyTokenRequest()),
    cleanData: () => dispatch(cleanDataAction()),
    onClose: () => dispatch(showDialogAction(false)),
    loginCompleted: () => dispatch(loginCompletedAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Authentication);
