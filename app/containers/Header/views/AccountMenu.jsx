/**
 *
 * AccountMenu
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Link from 'components/Link';
import AlertDialog from 'components/AlertDialog';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: 245,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  user_name: {
    display: 'block',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottom: 'solid 1px #ddd',
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
  },
  link: {
    display: 'block',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottom: 'solid 1px #ddd',
    color: theme.palette.textColor[1],
    cursor: 'pointer',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function AccountMenu(props) {
  const {
    menu,
    onSignOut,
    onClosePopover,
    onShowInviteDialog,
    userInfo,
  } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const classes = useStyle();

  const onConfirmCancelSignOut = () => {
    setOpenConfirm(false);
  };

  const onConfirmSignOut = () => {
    onSignOut();
    setOpenConfirm(false);
    onClosePopover();
  };

  const handleActions = item => {
    if (item.id === 'invite') {
      onShowInviteDialog();
    }
    onClosePopover();
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Typography color="secondary" className={classes.user_name}>
          {userInfo.name}
        </Typography>
        {menu.map(item =>
          item.link ? (
            <Link key={item.id} className={classes.link} to={item.link}>
              {item.name}
            </Link>
          ) : (
            <Typography
              key={item.id}
              className={classes.link}
              onClick={() => handleActions(item)}
            >
              {item.name}
            </Typography>
          ),
        )}
        <Typography
          component="a"
          className={classes.link}
          onClick={() => setOpenConfirm(true)}
        >
          {'Đăng xuất'}
        </Typography>
      </div>
      <AlertDialog
        open={openConfirm}
        description="Bạn có chắc chắn muốn đăng xuất không?"
        onCancel={onConfirmCancelSignOut}
        onConfirm={onConfirmSignOut}
      />
    </>
  );
}

AccountMenu.propTypes = {
  menu: PropTypes.array,
  userInfo: PropTypes.object,
  onSignOut: PropTypes.func,
  onClosePopover: PropTypes.func,
  onShowInviteDialog: PropTypes.func,
};

export default AccountMenu;
