import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import InputMask from 'react-input-mask';
import Alert from '@material-ui/lab/Alert';
import get from 'lodash/get';

import { useStyles } from '../styles';

function EnterPhone(props) {
  const { onVerifyPhone, error } = props;
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [isError, setIsError] = useState(true);
  const [message, setMessage] = useState('');

  const onChange = event => {
    const value = event.target.value.replace(/[^\d]+/g, '');
    const vnfRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (value.length === 10) {
      if (vnfRegex.test(value) === false) {
        setIsError(true);
        setMessage('Số điện thoại không hợp lệ');
      } else {
        setIsError(false);
        setMessage('');
      }
    } else {
      setIsError(true);
      setMessage('');
    }
    setPhone(value);
  };

  const handleGetVerifyCode = () => {
    if (phone.length === 10 && !isError) {
      onVerifyPhone(phone);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" className={classes.title}>
        Nhập số điện thoại
      </Typography>

      <Typography variant="subtitle1" align="center" className={classes.text}>
        Chúng tôi sẽ không chia sẻ số điện thoại cá nhân của bạn với những người
        dùng hệ thống khác. Mỗi lần thay đổi số điện thoại bạn cần phải xác minh
        số điện thoại mới.
      </Typography>
      <InputMask
        mask="999 999 9999"
        placeholder="Số điện thoại"
        className={classes.input}
        onChange={onChange}
      />
      {error && (
        <Alert severity="error">{get(error, 'data.message', '')}</Alert>
      )}
      <div style={{ position: 'relative' }}>
        <Typography align="center" className={classes.validatePhone}>
          {message}
        </Typography>
        <Button
          id="sign-in-button"
          fullWidth
          onClick={handleGetVerifyCode}
          className={`${classes.btn} ${classes.btnMain} ${
            !isError ? classes.btnMainActive : ''
          }`}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  );
}

EnterPhone.propTypes = {
  onVerifyPhone: PropTypes.func,
  error: PropTypes.object,
};
export default EnterPhone;
