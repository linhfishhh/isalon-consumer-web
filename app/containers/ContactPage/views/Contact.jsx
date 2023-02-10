import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import validation from 'utils/validation';
import useStyles from '../styles';

const dataEmpty = { name: '', email: '', phone: '', content: '' };

function Contact(props) {
  const classes = useStyles();

  const [contactParams, setContactParams] = useState(dataEmpty);
  const [validate, setValidate] = useState({});

  const { onSend } = props;

  const handleInputChange = name => evt => {
    const value = get(evt, 'target.value') || '';
    const ret = { ...contactParams };
    set(ret, name, value);
    setContactParams(ret);
  };

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: contactParams,
        keys: ['name', 'email', 'phone', 'content'],
        messages: [
          'Vui lòng nhập tên của bạn!',
          'Vui lòng nhập email của bạn!',
          'Vui lòng nhập SĐT của bạn!',
          'Vui lòng nhập nội dung liên hệ!',
        ],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const onSendClick = () => {
    if (validateField() && onSend) {
      onSend(contactParams);
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.featureHeadline}>
            Cho chúng tôi biết bạn cần gì
          </Typography>
        </Grid>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Tên của bạn"
              fullWidth
              onChange={handleInputChange('name')}
              error={validate.name && validate.name.error}
              helperText={validate.name && validate.name.helperMessageText}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Email liên hệ"
              fullWidth
              onChange={handleInputChange('email')}
              error={validate.email && validate.email.error}
              helperText={validate.email && validate.email.helperMessageText}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Số điện thoại"
              fullWidth
              onChange={handleInputChange('phone')}
              error={validate.phone && validate.phone.error}
              helperText={validate.phone && validate.phone.helperMessageText}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              placeholder="Nội dung liên hệ"
              fullWidth
              multiline
              rows={5}
              onChange={handleInputChange('content')}
              error={validate.content && validate.content.error}
              helperText={
                validate.content && validate.content.helperMessageText
              }
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              className={classes.contactButton}
              onClick={onSendClick}
            >
              LIÊN HỆ CHÚNG TÔI
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Contact.propTypes = {
  onSend: PropTypes.func,
};

export default memo(Contact);
