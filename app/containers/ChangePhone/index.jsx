/**
 *
 * ChangePhone
 *
 */

import React, { memo, useState } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MuiButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import AreaSafe from 'components/AreaSafe';
import Logo from 'assets/images/logo.png';
import Img from 'components/Img';
import Button from 'components/Button';
import Transition from 'components/Transition';

import VerifyPhone from 'containers/Authentication/Views/Verify';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import { useStyles } from './styles';
import { makeSelectChanePhoneError } from './selectors';
import {
  getVerificationCodeRequest,
  clearDataRequest,
  verifyCodeRequest,
} from './actions';
import EnterPhone from './views/EnterPhone';

function ChangePhone(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState('enterPhone');
  const [phoneSignIn, setPhoneSignIn] = useState('');

  const { error, getVerificationCode, verifyCode } = props;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearDataRequest());
    setStep('enterPhone');
    setPhoneSignIn('');
    setOpen(false);
  };

  const onVerify = code => {
    if (!isEmpty(phoneSignIn) && !isEmpty(code)) {
      verifyCode(phoneSignIn, code, () => {
        handleClose();
      });
    }
  };

  const onVerifyPhone = phone => {
    setPhoneSignIn(phone);
    if (!isEmpty(phone)) {
      getVerificationCode(phone, () => {
        setStep('verify');
      });
    }
  };

  const onResendVerifyCode = () => {
    if (!isEmpty(phoneSignIn)) {
      getVerificationCode(phoneSignIn, () => {
        setStep('verify');
      });
    }
  };

  return (
    <div>
      {isMobileOnly ? (
        <IconButton
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      ) : (
        <MuiButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleClickOpen}
        >
          Thay đổi
        </MuiButton>
      )}
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
              onClick={handleClose}
              className={classes.btnClose}
            />
          )}
          <div className={classes.wrapper}>
            {isMobileOnly && (
              <>
                <AreaSafe />
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <Img src={Logo} className={classes.logo} />
              </>
            )}
            <Paper className={classes.paper}>
              {step === 'verify' && (
                <VerifyPhone
                  phone={phoneSignIn}
                  errorMessage={get(error, 'message', '')}
                  onVerify={onVerify}
                  onResendVerifyCode={onResendVerifyCode}
                  onClose={handleClose}
                />
              )}
              {step === 'enterPhone' && (
                <EnterPhone onVerifyPhone={onVerifyPhone} error={error} />
              )}
            </Paper>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ChangePhone.propTypes = {
  error: PropTypes.object,
  getVerificationCode: PropTypes.func,
  verifyCode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectChanePhoneError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVerificationCode: (phone, success) =>
      dispatch(getVerificationCodeRequest({ phone, success })),
    verifyCode: (phone, code, success) =>
      dispatch(verifyCodeRequest({ phone, code, success })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChangePhone);
