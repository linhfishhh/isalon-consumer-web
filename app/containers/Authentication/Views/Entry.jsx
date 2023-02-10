import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@material-ui/core';
import { Facebook as FaceBookIcon } from 'mdi-material-ui';

import { loginFacebook } from 'utils/auth';
import { isNative, isMobileOnly } from 'utils/platform';

import { appendAreaCode } from 'utils/stringFormat';
import InputMask from 'react-input-mask';
import FacebookLogin from 'react-facebook-login';
import { PhoneIcon } from 'assets/svgIcon';

import { useStyles } from '../styles';

function Entry(props) {
  const { onSignIn, onSignInFaceBook, onClose } = props;
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(true);
  const [message, setMessage] = useState('');

  const onChange = event => {
    const value = event.target.value.replace(/[^\d]+/g, '');
    const vnfRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (value.length === 10) {
      if (vnfRegex.test(value) === false) {
        setError(true);
        setMessage('Số điện thoại không hợp lệ');
      } else {
        setError(false);
        setMessage('');
      }
    } else {
      setError(true);
      setMessage('');
    }
    setPhone(value);
  };

  const handleSignIn = () => {
    if (phone.length === 10 && !error) {
      const newPhone = appendAreaCode(phone);
      onSignIn(newPhone, 0);
    }
  };

  const handleLoginFacebook = response => {
    onSignInFaceBook(response);
  };

  const handleLoginFacebookMobile = () => {
    loginFacebook(response => {
      onSignInFaceBook(response);
    });
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSignIn();
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography
          variant="h2"
          align={isMobileOnly ? 'left' : 'center'}
          style={{ marginBottom: isMobileOnly ? 0 : 40 }}
          className={classes.title}
        >
          Đăng nhập
        </Typography>
        {isMobileOnly && (
          <Typography style={{ marginBottom: 40 }}>Chào mừng bạn!</Typography>
        )}
      </Grid>
      <Grid item style={{ position: 'relative' }}>
        {isMobileOnly && <PhoneIcon className={classes.phoneIcon} />}
        <InputMask
          mask="999 999 9999"
          placeholder="Số điện thoại"
          className={`${classes.input} ${classes.inputPhone}`}
          onChange={onChange}
          onKeyPress={handleOnKeyPress}
        />
      </Grid>
      <Grid item style={{ position: 'relative' }}>
        <Typography align="center" className={classes.validatePhone}>
          {message}
        </Typography>
        <Button
          id="sign-in-button"
          fullWidth
          onClick={handleSignIn}
          className={`${classes.btn} ${classes.btnMain} ${
            !error ? classes.btnMainActive : ''
          }`}
        >
          {isMobileOnly ? 'ĐĂNG NHẬP' : 'Tiếp tục'}
        </Button>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          style={{ marginTop: 40 }}
          align="center"
          className={classes.text}
        >
          {isMobileOnly ? 'Hoặc sử dụng' : 'Bạn có thể đăng nhập qua'}
        </Typography>
      </Grid>
      <Grid item className={`${isMobileOnly && classes.centerText}`}>
        {isNative ? (
          <Button
            className={`${classes.btn} ${classes.btnFacebook}`}
            variant="outlined"
            onClick={handleLoginFacebookMobile}
          >
            <FaceBookIcon />
          </Button>
        ) : (
          <FacebookLogin
            textButton={isMobileOnly ? '' : ` Facebook`}
            cssClass={`${classes.btn} ${classes.btnFacebook}`}
            appId={process.env.FACEBOOK_APP_ID}
            disableMobileRedirect
            fields="name,email,picture"
            callback={handleLoginFacebook}
            icon={<FaceBookIcon />}
          />
        )}
      </Grid>
      {isMobileOnly && (
        <Grid item className={`${isMobileOnly && classes.centerText}`}>
          <Button
            id="skip-button"
            onClick={onClose}
            className={classes.btnSkipSmall}
          >
            Bỏ qua
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

Entry.propTypes = {
  onSignIn: PropTypes.func,
  onSignInFaceBook: PropTypes.func,
  onClose: PropTypes.func,
};
export default Entry;
