import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import AreaSafe from 'components/AreaSafe';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(4),
  },
  title: {},
  subTitle: {
    color: theme.palette.grey[500],
  },
  signIn: {
    display: 'inline',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const MenuList = props => {
  const { signIn } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    signIn(dispatch);
  };

  return (
    <div className={classes.wrapper}>
      <AreaSafe />
      <Typography className={classes.title} variant="h1">
        Chào bạn!
      </Typography>
      <Typography className={classes.subTitle}>
        {`Vui lòng `}
        <Typography
          className={classes.signIn}
          component="span"
          onClick={handleSignIn}
        >
          đăng nhập
        </Typography>
        {` để quản lý thông báo và lịch sử đặt chỗ cũng như các thông tin cá
        nhân của bạn nhé!`}
      </Typography>
    </div>
  );
};

MenuList.propTypes = {
  signIn: PropTypes.func,
};

export default memo(MenuList);
