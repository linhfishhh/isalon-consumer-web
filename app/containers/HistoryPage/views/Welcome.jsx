import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import EmptyPage from 'components/EmptyPage';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingTop: theme.spacing(20),
  },
  title: {},
  subTitle: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  signIn: {
    display: 'inline',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const Welcome = props => {
  const { signIn, typeActive = 0 } = props;

  const classes = useStyles();

  const handleSignIn = () => {
    signIn();
  };

  return (
    <EmptyPage
      className={classes.wrapper}
      title={typeActive === 0 ? 'Lịch sử đặt chỗ' : 'Lịch sử đặt hàng'}
    >
      <Typography className={classes.subTitle} align="center">
        {`Vui lòng `}
        <Typography
          className={classes.signIn}
          component="span"
          onClick={handleSignIn}
        >
          đăng nhập
        </Typography>
        {typeActive === 0
          ? ' để quản lý các đặt chỗ sẽ thực hiện sắp tới tại đây nhé!'
          : ' để quản lý các đơn hàng đang giao tại đây nhé!'}
      </Typography>
    </EmptyPage>
  );
};

Welcome.propTypes = {
  signIn: PropTypes.func,
  typeActive: PropTypes.number,
};

export default memo(Welcome);
