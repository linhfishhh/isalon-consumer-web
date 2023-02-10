import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import InputMask from 'react-input-mask';

import { useStyles } from '../styles';

function EnterPhone(props) {
  const { user, onVerifyPhone, errorMessage } = props;
  const classes = useStyles();
  const [phone, setPhone] = useState('');

  const onChange = event => {
    const value = event.target.value.replace(/[^\d]+/g, '');
    setPhone(value);
  };

  const handleSignIn = () => {
    if (phone.length === 10) {
      onVerifyPhone(phone);
    }
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSignIn();
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" className={classes.title}>
        Nhập số điện thoại
      </Typography>

      <Typography variant="subtitle1" align="center" className={classes.text}>
        {`Bạn đã đăng ký bằng tài khoản mạng xã hội ${
          user.email ? `với email: ${user.email}` : 'facebook'
        }. chúng tôi vẫn cần thêm số điện thoại của bạn để có thể phục vụ và liên hệ bạn tốt hơn.`}
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        className={classes.textError}
      >
        {errorMessage}
      </Typography>
      <InputMask
        mask="999 999 9999"
        placeholder="Số điện thoại"
        className={classes.input}
        onChange={onChange}
        onKeyPress={handleOnKeyPress}
      />
      <Button
        id="sign-in-button"
        fullWidth
        onClick={handleSignIn}
        className={[
          classes.btn,
          classes.btnMain,
          phone.length === 10 && classes.btnMainActive,
        ].join(' ')}
      >
        Tiếp tục
      </Button>
    </>
  );
}

EnterPhone.propTypes = {
  user: PropTypes.object,
  onVerifyPhone: PropTypes.func,
  errorMessage: PropTypes.string,
};
export default EnterPhone;
