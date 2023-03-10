import React, { useState, useEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@material-ui/core';
import InputMask from 'react-input-mask';

import { ShieldIcon } from 'assets/svgIcon';
import { useStyles } from '../styles';

function Verify(props) {
  const { phone, errorMessage, onVerify, onResendVerifyCode } = props;
  const classes = useStyles();
  const [verifyCode, setVerifyCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(59);
  let interval;

  const onChange = event => {
    const value = event.target.value.replace(/[^\d]+/g, '');
    setVerifyCode(value);
  };

  const handleVerify = () => {
    if (verifyCode.length === 6) {
      onVerify(verifyCode);
    }
  };

  const handleResendVerifyCode = () => {
    onResendVerifyCode();
    setVerifyCode('');
    setResendDisabled(true);
  };

  const resetResendButton = () => {
    setResendDisabled(false);
    setTimeLeft(59);
    clearInterval(interval);
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleVerify();
    }
  };

  useEffect(() => {
    if (resendDisabled) {
      interval = setInterval(() => {
        if (timeLeft < 1) {
          resetResendButton();
          return;
        }
        setTimeLeft(prevState => prevState - 1);
      }, 1000);
    } else {
      resetResendButton();
    }
    return () => clearInterval(interval);
  }, [timeLeft, resendDisabled]);

  return (
    <>
      <Grid container justify="center">
        <Grid item>
          <Grid container direction="column" justify="center" spacing={2}>
            {!isMobileOnly && (
              <Grid item container justify="center">
                <ShieldIcon className={classes.shieldIcon} />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h4" align="center" className={classes.title}>
                {isMobileOnly ? 'X??c minh' : 'X??c minh t??i kho???n'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.text}
              >
                M?? OTP ???? ???????c g???i v??o s??? ??i???n tho???i c???a b???n
              </Typography>
            </Grid>
            {errorMessage && (
              <Grid item>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={classes.textError}
                >
                  {errorMessage}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                className={classes.phoneNumber}
              >
                {phone}
              </Typography>
            </Grid>
            <Grid item>
              <InputMask
                mask="9  9  9  9  9  9"
                placeholder="Nh???p m?? OTP"
                className={classes.input}
                value={verifyCode}
                onChange={onChange}
                onKeyPress={handleOnKeyPress}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                onClick={handleVerify}
                className={[
                  classes.btn,
                  classes.btnMain,
                  verifyCode.length === 6 && classes.btnMainActive,
                ].join(' ')}
              >
                X??c nh???n
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        {!isMobileOnly && (
          <Grid item xs={12} sm container alignItems="center">
            <Typography variant="body2" align="center" className={classes.text}>
              B???n ch??a nh???n ???????c m?? x??c minh
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sm>
          <Button
            fullWidth
            onClick={handleResendVerifyCode}
            disabled={resendDisabled}
            className={`${classes.btn} ${classes.btnResend}`}
          >
            {resendDisabled ? `G???i l???i (${timeLeft})` : 'G???i l???i'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

Verify.propTypes = {
  phone: PropTypes.string,
  errorMessage: PropTypes.string,
  onVerify: PropTypes.func,
  onResendVerifyCode: PropTypes.func,
};
export default Verify;
