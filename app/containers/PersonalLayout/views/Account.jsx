/**
 *
 * Account
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

import Button from 'components/Button';
import Popover from 'components/Popover';
import AccountCart from 'containers/AccountCart';
import { path } from 'routers/path';

import { useAffiliate } from 'utils/hooks';

import AccountMenu from 'containers/Header/views/AccountMenu';

const useStyles = makeStyles(theme => ({
  wrapperButton: {
    height: 90,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#33363f',
  },
  avatar: {
    marginRight: 15,
    marginLeft: 15,
    height: 90,
    display: 'flex',
    alignItems: 'center',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    marginLeft: 10,
    cursor: 'pointer',
    // boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
    //   theme.palette.borderColor[0],
    // )}, 0.5)`,
  },
  signInButton: {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
      theme.palette.borderColor[0],
    )}, 0.5)`,
    '&:hover': {
      boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
        theme.palette.borderColor[0],
      )}, 0.5)`,
    },
  },
}));

const links = [
  { id: 'profile', name: 'Xem & Chỉnh sửa hồ sơ', link: path.personal },
  {
    id: 'history',
    name: 'Quản lý đặt chỗ & mua hàng',
    link: path.bookingHistory,
  },
  { id: 'favorite', name: 'Yêu thích', link: path.favorite },
];

const Account = props => {
  const {
    authenticated,
    onSignIn,
    onSignOut,
    cartQuantity,
    onShowInvite,
    userInfoLogged,
  } = props;
  const classes = useStyles();
  const [showPopover, setShowPopover] = useState(false);
  const [type, setType] = useState('');
  const [anchorEl, setAnchorEl] = useState();
  const [menu, setMenu] = useState([...links]);
  const { affiliateSettings } = useAffiliate();

  useEffect(() => {
    if (affiliateSettings.affiliateEnabled) {
      const newMenu = [...links];
      newMenu.splice(2, 0, { id: 'invite', name: 'Mời bạn bè' });
      setMenu(newMenu);
    }
  }, [affiliateSettings]);

  const handleShowPopover = name => event => {
    setAnchorEl(event.currentTarget.parentNode);
    setType(name);
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setAnchorEl();
    setShowPopover(false);
  };

  return (
    <>
      {authenticated ? (
        <>
          <div className={classes.wrapperButton}>
            <Button
              className={classes.button}
              icon="cart"
              type="iconButton"
              onClick={handleShowPopover('cart')}
              badgeNumber={cartQuantity}
              fontSize="small"
            />
          </div>
          <div className={classes.avatar}>
            <Avatar
              alt="avatar"
              className={classes.bigAvatar}
              src={userInfoLogged.avatar}
              onClick={handleShowPopover('profile')}
            />
          </div>
        </>
      ) : (
        <Button
          className={classes.signInButton}
          icon="user"
          name="Đăng nhập"
          options={{ showIcon: true, iconColor: '#fff' }}
          onClick={onSignIn}
        />
      )}
      <Popover
        open={showPopover}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        align="right"
      >
        {type === 'profile' && (
          <AccountMenu
            menu={menu}
            onSignOut={onSignOut}
            onClosePopover={handleClosePopover}
            onShowInviteDialog={onShowInvite}
            userInfo={userInfoLogged}
          />
        )}
        {type === 'cart' && (
          <AccountCart onClickCart={() => setShowPopover(false)} />
        )}
      </Popover>
    </>
  );
};

Account.propTypes = {
  authenticated: PropTypes.bool,
  userInfoLogged: PropTypes.object,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
  cartQuantity: PropTypes.number,
  onShowInvite: PropTypes.func,
};

export default Account;
